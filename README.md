
![LiteCoder Ai Logo](logo.jpg)

**Advanced AI-powered code completion with transparent inline suggestions**

*Made by [Wahibe Asa](https://github.com/LiteCoderAI)*

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=LiteCoderAi.litecoder-ai)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-blue.svg)](https://code.visualstudio.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Install Extension](https://marketplace.visualstudio.com/items?itemName=LiteCoderAi.litecoder-ai) • [Report Bug](https://github.com/LiteCoderAI/LiteCoder-Ai/issues) • [Request Feature](https://github.com/LiteCoderAI/LiteCoder-Ai/issues)

</div>

---

## 🚀 Features

### ✨ Transparent Inline Autocomplete
- **Ghost Text Suggestions** - Real-time AI suggestions appear as translucent text
- **Multiple Accept Methods** - Tab, Ctrl+Right Arrow, status bar button, or CodeLens
- **Context-Aware** - Suggestions adapt to your coding context and language
- **Real-Time Updates** - Suggestions update dynamically as you type

### 🤖 Multi-Model AI Engine
Our proprietary ensemble system combines four powerful AI models:

| Model | Weight | Specialization |
|-------|--------|----------------|
| **StarCoder** | 35% | Advanced code generation |
| **CodeT5** | 25% | Text-to-code transformation |
| **CodeBERT** | 25% | Contextual understanding |
| **LiteCoder** | 15% | Lightweight performance |

### 🌐 Multi-Language Support
- **HTML** - Semantic tag suggestions and accessibility features
- **CSS** - Property completions and modern layout patterns
- **JavaScript** - ES6+ features and async/await patterns
- **TypeScript** - Type-aware suggestions and interface completions
- **Python** - PEP 8 compliance and docstring generation
- **PHP** - Modern syntax and framework patterns
- **JSON** - Schema validation and structure completion
- **Lua** - Scripting optimizations and game development patterns

### 🔒 Security Features
- **Vulnerability Detection** - Real-time scanning for security issues
- **Security Scoring** - Confidence metrics for code safety
- **Pattern Analysis** - Detection of SQL injection, XSS, and code injection
- **Best Practice Enforcement** - Suggestions that follow security guidelines

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "LiteCoder Ai"
4. Click Install

### From VSIX File
1. Download the latest `.vsix` file from [Releases](https://github.com/LiteCoderAI/LiteCoder-Ai/releases)
2. Open VS Code
3. Go to Extensions → "..." → "Install from VSIX..."
4. Select the downloaded file

## 🎯 Usage

### Basic Usage
1. Open any supported file type
2. Start typing to trigger suggestions
3. Accept suggestions using:
   - **Tab** - Quick acceptance
   - **Ctrl+Right Arrow** - Alternative acceptance
   - **Status Bar Button** - Click the lightbulb icon
   - **CodeLens** - Click inline acceptance buttons (optional)

### Commands
Access these commands via Command Palette (Ctrl+Shift+P):

- `LiteCoder: Enable Transparent Mode` - Enable ghost text suggestions
- `LiteCoder: Disable Transparent Mode` - Disable ghost text suggestions
- `LiteCoder: Show Security Report` - View security analysis
- `LiteCoder: Configure Language Settings` - Customize per-language settings

## ⚙️ Configuration

### Settings
Configure LiteCoder Ai in VS Code settings:

```json
{
  "litecoder.enableTransparentMode": true,
  "litecoder.suggestionDelay": 100,
  "litecoder.securityLevel": "medium",
  "litecoder.enableStatusBar": true,
  "litecoder.enableCodeLens": false
}
```

### Language-Specific Settings
```json
{
  "litecoder.languageSettings": {
    "python": {
      "enableDocstrings": true,
      "enableTypeHints": true,
      "securityLevel": "high"
    },
    "javascript": {
      "enableES6": true,
      "enableAsyncAwait": true,
      "securityLevel": "medium"
    },
    "html": {
      "enableSemanticTags": true,
      "enableAccessibility": true,
      "securityLevel": "low"
    }
  }
}
```

## 🎨 Examples

### Python Development
```python
# Type: def process_data(
# Ghost text: data, validate=True, format='json'):
def process_data(data, validate=True, format='json'):
    # Type: if validate:
    # Ghost text: return validate_and_format(data, format)
    if validate:
        return validate_and_format(data, format)
    return data
```

### HTML Development
```html
<!-- Type: <div class="card"> -->
<div class="card">
    <!-- Ghost text: <div class="card-header"> -->
    <div class="card-header">
        <!-- Ghost text: <h3 class="card-title">Title</h3> -->
        <h3 class="card-title">Title</h3>
    </div>
</div>
```

### CSS Development
```css
/* Type: .navbar { */
.navbar {
    /* Ghost text: display: flex; */
    display: flex;
    /* Ghost text: justify-content: space-between; */
    justify-content: space-between;
    /* Ghost text: align-items: center; */
    align-items: center;
}
```

### JavaScript Development
```javascript
// Type: const apiCall = async (url) => {
const apiCall = async (url) => {
    // Ghost text: try {
    try {
        // Ghost text: const response = await fetch(url);
        const response = await fetch(url);
        // Ghost text: return await response.json();
        return await response.json();
    } catch (error) {
        // Ghost text: console.error('API Error:', error);
        console.error('API Error:', error);
    }
};
```

## 🛠️ Development

### Prerequisites
- Node.js 16+
- VS Code 1.74+
- TypeScript 4.9+

### Setup
```bash
# Clone the repository
git clone https://github.com/LiteCoderAI/LiteCoder-Ai.git
cd LiteCoder-Ai

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in development mode
npm run watch
```

### Building
```bash
# Build the extension
npm run compile

# Package for distribution
npm run package
```

### Testing
```bash
# Run tests
npm test

# Run linting
npm run lint
```

## 📊 Performance

- **Response Time**: Sub-100ms suggestion generation
- **Memory Usage**: Optimized for minimal resource consumption
- **Battery Life**: Efficient algorithms for laptop development
- **Network**: Works offline with built-in language packs

## 🔮 Roadmap

### Phase 1: Enhanced AI Integration
- [ ] Hugging Face model integration
- [ ] OpenAI API support
- [ ] Local model execution
- [ ] Custom model training

### Phase 2: Extended Language Support
- [ ] Rust, Go, Swift, Kotlin, C++
- [ ] Framework-specific patterns (React, Vue, Angular)
- [ ] Database languages (SQL, MongoDB)
- [ ] Configuration files (YAML, TOML, INI)

### Phase 3: Collaboration Features
- [ ] Cloud suggestions
- [ ] Team collaboration
- [ ] Shared learning patterns
- [ ] Enterprise features

### Phase 4: Advanced Features
- [ ] Performance optimizations
- [ ] Plugin system
- [ ] Custom triggers
- [ ] Advanced analytics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- VS Code team for the excellent extension API
- The open-source AI community for inspiration
- All contributors and users who help improve LiteCoder Ai

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/LiteCoderAI/LiteCoder-Ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LiteCoderAI/LiteCoder-Ai/discussions)
- **Email**: [Contact Developer](mailto:wahibeasa2@gmail.com)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Wahibe Asa](https://github.com/LiteCoderAI)

---

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=LiteCoderAI/LiteCoder-Ai&type=Date)](https://star-history.com/#LiteCoderAI/LiteCoder-Ai&Date)

*Track the growth of LiteCoder Ai on GitHub*

</div>
