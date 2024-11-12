// Simulated dictionary structure in JavaScript
let directoryDictionary = {};
let directoryName = '';

// Load data from localStorage when the page loads
window.onload = function() {
    loadDirectory();
};

// Function to set up the directory (similar to loading JSON in Python)
function setupDirectory() {
    directoryName = document.getElementById("directoryInput").value;

    if (!directoryName) {
        document.getElementById("directoryMessage").innerText = "Please enter a valid directory name.";
        return;
    }

    // Create a new directory with empty files and words dictionary, or load existing data
    directoryDictionary = { directory: directoryName, files: [], words: {} };
    document.getElementById("directoryMessage").innerText = `Directory '${directoryName}' is set up.`;

    // Save to localStorage
    saveDirectory();
}

// Function to add files to the directory
function addFile() {
    if (!directoryName) {
        alert("Please set up a directory first.");
        return;
    }

    const fileName = document.getElementById("fileNameInput").value;
    if (fileName) {
        directoryDictionary.files.push(fileName);
        document.getElementById("fileNameInput").value = '';
        alert(`File '${fileName}' added to directory '${directoryName}'.`);
        
        // Save to localStorage
        saveDirectory();
    } else {
        alert("Please enter a valid file name.");
    }
}

// Function to add a word and definition to the words dictionary
function addWord() {
    if (!directoryName) {
        alert("Please set up a directory first.");
        return;
    }

    const word = document.getElementById("wordInput").value;
    const definition = document.getElementById("definitionInput").value;

    if (word && definition) {
        // Store the word and its definition
        directoryDictionary.words[word] = definition;
        document.getElementById("wordInput").value = '';
        document.getElementById("definitionInput").value = '';
        alert(`Word '${word}' with definition added.`);
        
        // Save to localStorage
        saveDirectory();
    } else {
        alert("Please enter both a word and a definition.");
    }
}

// Function to count files in the directory
function countFiles() {
    if (!directoryName) {
        document.getElementById("fileCountMessage").innerText = "No directory is set up.";
        return;
    }
    
    const fileCount = directoryDictionary.files.length;
    document.getElementById("fileCountMessage").innerText = `The directory '${directoryName}' has ${fileCount} files.`;
}

// Function to display the directory contents, including words and definitions
function showDirectoryContents() {
    if (!directoryName) {
        document.getElementById("directoryContents").innerText = "No directory is set up.";
        return;
    }
    
    document.getElementById("directoryContents").innerText = JSON.stringify(directoryDictionary, null, 2);
}

// Function to save the directory data to localStorage
function saveDirectory() {
    localStorage.setItem('directoryDictionary', JSON.stringify(directoryDictionary));
}

// Function to load the directory data from localStorage
function loadDirectory() {
    const storedData = localStorage.getItem('directoryDictionary');
    if (storedData) {
        directoryDictionary = JSON.parse(storedData);
        directoryName = directoryDictionary.directory;
        document.getElementById("directoryMessage").innerText = `Loaded directory '${directoryName}' from storage.`;
    }
}