// Function to dynamically load lint rule descriptions
async function loadLintRules() {
    const eslintRulesUrl = 'https://github.com/eslint/eslint/tree/main/docs/src/rules';
    const typescriptEslintRulesUrl = 'https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules';

    try {
        const [eslintResponse, typescriptEslintResponse] = await Promise.all([
            fetch(eslintRulesUrl),
            fetch(typescriptEslintRulesUrl)
        ]);

        const eslintRules = await eslintResponse.json();
        const typescriptEslintRules = await typescriptEslintResponse.json();

        displayRules(eslintRules, 'ESLint Rules');
        displayRules(typescriptEslintRules, 'TypeScript ESLint Rules');
    } catch (error) {
        console.error('Failed to load lint rules:', error);
    }
}

// Function to display rules on the page
function displayRules(rules, title) {
    const rulesContainer = document.createElement('div');
    rulesContainer.className = 'rules-container';

    const rulesTitle = document.createElement('h2');
    rulesTitle.textContent = title;
    rulesContainer.appendChild(rulesTitle);

    const rulesList = document.createElement('ul');
    rules.forEach(rule => {
        const ruleItem = document.createElement('li');
        ruleItem.textContent = rule.name;
        rulesList.appendChild(ruleItem);
    });
    rulesContainer.appendChild(rulesList);

    document.body.appendChild(rulesContainer);
}

// Search and filter functionality
function setupSearchAndFilter() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const ruleItems = document.querySelectorAll('.rules-container li');
        ruleItems.forEach(item => {
            const isVisible = item.textContent.toLowerCase().includes(searchTerm);
            item.style.display = isVisible ? 'block' : 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadLintRules();
    setupSearchAndFilter();
});
