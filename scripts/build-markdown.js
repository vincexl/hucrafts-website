import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(SOURCE_DIR, 'public');
const MD_PATTERN = /\.md$/;

// HTML template
const htmlTemplate = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 { color: #c85a5a; border-bottom: 2px solid #c85a5a; padding-bottom: 10px; }
    h2 { color: #2c3e50; margin-top: 30px; }
    h3 { color: #34495e; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #c85a5a;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f7eeee;
    }
    code {
      background-color: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
    }
    pre {
      background-color: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code {
      background-color: transparent;
      padding: 0;
    }
  </style>
</head>
<body>
${content}
</body>
</html>`;

// Convert markdown file to HTML
function convertMarkdownToHTML(mdFilePath) {
  const mdContent = fs.readFileSync(mdFilePath, 'utf-8');
  
  // Parse frontmatter if exists
  const { data: frontmatter, content } = matter(mdContent);
  
  // Convert markdown to HTML
  const htmlContent = marked(content);
  
  // Get title from frontmatter or filename
  const title = frontmatter.title || path.basename(mdFilePath, '.md').replace(/_/g, ' ');
  
  // Generate full HTML
  const fullHTML = htmlTemplate(title, htmlContent);
  
  // Determine output path
  const relativePath = path.relative(SOURCE_DIR, mdFilePath);
  const outputPath = path.join(OUTPUT_DIR, relativePath.replace(MD_PATTERN, '.html'));
  
  // Ensure output directory exists
  const outputDirPath = path.dirname(outputPath);
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
  
  // Write HTML file
  fs.writeFileSync(outputPath, fullHTML);
  
  console.log(`✓ Converted: ${mdFilePath} → ${outputPath}`);
  
  return outputPath;
}

// Find all markdown files in the root directory
function findMarkdownFiles() {
  const files = fs.readdirSync(SOURCE_DIR);
  return files
    .filter(file => MD_PATTERN.test(file))
    .map(file => path.join(SOURCE_DIR, file));
}

// Main execution
console.log('🔄 Converting markdown files to HTML...\n');

const mdFiles = findMarkdownFiles();

if (mdFiles.length === 0) {
  console.log('No markdown files found in the root directory.');
  process.exit(0);
}

mdFiles.forEach(convertMarkdownToHTML);

console.log(`\n✅ Converted ${mdFiles.length} file(s) successfully!`);
