import * as vscode from 'vscode';
import { UltimateAIEngine } from './ultimate-ai-engine';

let aiEngine: UltimateAIEngine;
let statusBarItem: vscode.StatusBarItem;
let currentSuggestion: string | null = null;
let suggestionDecoration: vscode.TextEditorDecorationType;
let suggestionRange: vscode.Range | null = null;

// Trigger characters for different languages
const TRIGGER_CHARACTERS = [' ', '(', '{', '[', '<', '.', ':', '=', '\n', '\t'];

export function activate(context: vscode.ExtensionContext) {
    console.log('ULTIMATE LiteCoder AI extension is now active!');

    // Initialize AI Engine
    aiEngine = new UltimateAIEngine();

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'litecoder.acceptSuggestion';
    statusBarItem.text = '$(lightbulb) Accept';
    statusBarItem.tooltip = 'Accept LiteCoder suggestion';
    context.subscriptions.push(statusBarItem);

    // Create decoration type for transparent suggestions
    suggestionDecoration = vscode.window.createTextEditorDecorationType({
        after: {
            color: new vscode.ThemeColor('editorGhostText.foreground'),
            fontStyle: 'italic'
        }
    });

    // Register commands
    const commands = [
        vscode.commands.registerCommand('litecoder.enableTransparentMode', enableTransparentMode),
        vscode.commands.registerCommand('litecoder.disableTransparentMode', disableTransparentMode),
        vscode.commands.registerCommand('litecoder.acceptSuggestion', acceptSuggestion),
        vscode.commands.registerCommand('litecoder.showSecurityReport', showSecurityReport),
        vscode.commands.registerCommand('litecoder.configureLanguageSettings', configureLanguageSettings)
    ];

    commands.forEach(command => context.subscriptions.push(command));

    // Register completion provider for all supported languages
    const supportedLanguages = ['html', 'css', 'javascript', 'typescript', 'python', 'php', 'json', 'lua'];
    
    supportedLanguages.forEach(language => {
        const provider = vscode.languages.registerCompletionItemProvider(
            language,
            new LiteCoderCompletionProvider(),
            ...TRIGGER_CHARACTERS
        );
        context.subscriptions.push(provider);
    });

    // Register text change listener for transparent suggestions
    const textChangeListener = vscode.workspace.onDidChangeTextDocument(onTextChanged);
    context.subscriptions.push(textChangeListener);

    // Register cursor position change listener
    const cursorChangeListener = vscode.window.onDidChangeTextEditorSelection(onCursorChanged);
    context.subscriptions.push(cursorChangeListener);

    // Set context for keybindings
    vscode.commands.executeCommand('setContext', 'litecoder.suggestionActive', false);
}

class LiteCoderCompletionProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[]> {
        
        const config = vscode.workspace.getConfiguration('litecoder');
        const isTransparentModeEnabled = config.get<boolean>('enableTransparentMode', true);
        
        if (!isTransparentModeEnabled) {
            return [];
        }

        const line = document.lineAt(position.line).text;
        const prefix = line.substring(0, position.character);
        const language = document.languageId;

        try {
            const suggestions = await aiEngine.generateSuggestions(
                document.getText(),
                position,
                language,
                prefix
            );

            return suggestions.map((suggestion, index) => {
                const item = new vscode.CompletionItem(
                    suggestion.text,
                    vscode.CompletionItemKind.Text
                );
                
                item.detail = `LiteCoder AI - Confidence: ${Math.round(suggestion.confidence * 100)}%`;
                item.documentation = new vscode.MarkdownString(
                    `**Security Score:** ${Math.round(suggestion.securityScore * 100)}%\n\n` +
                    `**Model:** ${suggestion.model}\n\n` +
                    `${suggestion.description || 'AI-generated suggestion'}`
                );
                
                item.sortText = `00${index}`;
                item.insertText = suggestion.text;
                
                return item;
            });
        } catch (error) {
            console.error('LiteCoder AI error:', error);
            return [];
        }
    }
}

async function onTextChanged(event: vscode.TextDocumentChangeEvent) {
    const config = vscode.workspace.getConfiguration('litecoder');
    const isTransparentModeEnabled = config.get<boolean>('enableTransparentMode', true);
    const suggestionDelay = config.get<number>('suggestionDelay', 100);
    
    if (!isTransparentModeEnabled) {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document !== event.document) {
        return;
    }

    // Clear existing suggestion
    clearSuggestion(editor);

    // Debounce suggestions
    setTimeout(async () => {
        await showTransparentSuggestion(editor);
    }, suggestionDelay);
}

async function showTransparentSuggestion(editor: vscode.TextEditor) {
    const position = editor.selection.active;
    const document = editor.document;
    const language = document.languageId;
    
    const line = document.lineAt(position.line).text;
    const prefix = line.substring(0, position.character);

    try {
        const suggestions = await aiEngine.generateSuggestions(
            document.getText(),
            position,
            language,
            prefix
        );

        if (suggestions.length > 0) {
            const bestSuggestion = suggestions[0];
            currentSuggestion = bestSuggestion.text;
            
            // Create decoration for ghost text
            const range = new vscode.Range(position, position);
            suggestionRange = range;
            
            const decoration: vscode.DecorationOptions = {
                range: range,
                renderOptions: {
                    after: {
                        contentText: bestSuggestion.text,
                        color: new vscode.ThemeColor('editorGhostText.foreground'),
                        fontStyle: 'italic'
                    }
                }
            };

            editor.setDecorations(suggestionDecoration, [decoration]);
            
            // Show status bar item
            const config = vscode.workspace.getConfiguration('litecoder');
            const enableStatusBar = config.get<boolean>('enableStatusBar', true);
            
            if (enableStatusBar) {
                statusBarItem.show();
            }
            
            // Set context for keybindings
            vscode.commands.executeCommand('setContext', 'litecoder.suggestionActive', true);
        }
    } catch (error) {
        console.error('Error showing transparent suggestion:', error);
    }
}

function onCursorChanged(event: vscode.TextEditorSelectionChangeEvent) {
    const editor = event.textEditor;
    if (suggestionRange && !suggestionRange.contains(editor.selection.active)) {
        clearSuggestion(editor);
    }
}

function clearSuggestion(editor: vscode.TextEditor) {
    if (currentSuggestion) {
        editor.setDecorations(suggestionDecoration, []);
        currentSuggestion = null;
        suggestionRange = null;
        statusBarItem.hide();
        vscode.commands.executeCommand('setContext', 'litecoder.suggestionActive', false);
    }
}

async function acceptSuggestion() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !currentSuggestion) {
        return;
    }

    const position = editor.selection.active;
    
    await editor.edit(editBuilder => {
        editBuilder.insert(position, currentSuggestion!);
    });

    clearSuggestion(editor);
}

function enableTransparentMode() {
    const config = vscode.workspace.getConfiguration('litecoder');
    config.update('enableTransparentMode', true, vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage('LiteCoder AI Transparent Mode enabled');
}

function disableTransparentMode() {
    const config = vscode.workspace.getConfiguration('litecoder');
    config.update('enableTransparentMode', false, vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage('LiteCoder AI Transparent Mode disabled');
}

async function showSecurityReport() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }

    const document = editor.document;
    const securityReport = await aiEngine.generateSecurityReport(document.getText(), document.languageId);
    
    const panel = vscode.window.createWebviewPanel(
        'litecoderSecurityReport',
        'LiteCoder AI Security Report',
        vscode.ViewColumn.Two,
        {}
    );

    panel.webview.html = generateSecurityReportHTML(securityReport);
}

function generateSecurityReportHTML(report: any): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Security Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .vulnerability { background: #ffe6e6; padding: 10px; margin: 10px 0; border-left: 4px solid #ff4444; }
                .safe { background: #e6ffe6; padding: 10px; margin: 10px 0; border-left: 4px solid #44ff44; }
                .warning { background: #fff3e6; padding: 10px; margin: 10px 0; border-left: 4px solid #ffaa44; }
            </style>
        </head>
        <body>
            <h1>LiteCoder AI Security Report</h1>
            <h2>Overall Score: ${Math.round(report.overallScore * 100)}%</h2>
            <h3>Issues Found:</h3>
            ${report.issues.map((issue: any) => `
                <div class="${issue.severity}">
                    <h4>${issue.title}</h4>
                    <p>${issue.description}</p>
                    <p><strong>Line:</strong> ${issue.line}</p>
                    <p><strong>Severity:</strong> ${issue.severity}</p>
                </div>
            `).join('')}
        </body>
        </html>
    `;
}

async function configureLanguageSettings() {
    const languages = ['python', 'javascript', 'typescript', 'html', 'css', 'php', 'json', 'lua'];
    
    const selectedLanguage = await vscode.window.showQuickPick(languages, {
        placeHolder: 'Select a language to configure'
    });

    if (selectedLanguage) {
        const config = vscode.workspace.getConfiguration('litecoder');
        const languageSettings = config.get<any>('languageSettings', {});
        
        // Show current settings and allow modification
        vscode.window.showInformationMessage(
            `Current settings for ${selectedLanguage}: ${JSON.stringify(languageSettings[selectedLanguage] || {}, null, 2)}`
        );
    }
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    if (suggestionDecoration) {
        suggestionDecoration.dispose();
    }
}
