// Log to console to confirm script execution
console.log('toddle-ext.js is running!');

// Change the page's background color
document.body.style.backgroundColor = '#e6f3ff'; // Light blue

// Create a visible text box in the top-right corner
const debugDiv = document.createElement('div');
debugDiv.textContent = 'toddle-ext.js Loaded!';
debugDiv.style.position = 'fixed';
debugDiv.style.top = '10px';
debugDiv.style.right = '10px';
debugDiv.style.padding = '10px';
debugDiv.style.backgroundColor = '#ffeb3b'; // Yellow
debugDiv.style.border = '2px solid #000';
debugDiv.style.zIndex = '9999';
debugDiv.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(debugDiv);

// Optional: Change all h1 headers to red
const headers = document.getElementsByTagName('h1');
for (let header of headers) {
    header.style.color = 'red';
}
