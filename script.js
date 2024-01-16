// Function to check the password
function checkPassword() {
  var passwordInput = document.getElementById('passwordInput').value;
  if (passwordInput === 'jeet6789') {
    // Password is correct, hide the password modal and proceed
    document.getElementById('passwordModal').style.display = 'none';
  } else {
    // Password is incorrect, show an alert and clear the input
    alert('Incorrect password. Please try again.');
    document.getElementById('passwordInput').value = '';
  }
}

// On page load, show the password modal
window.onload = function() {
  document.getElementById('passwordModal').style.display = 'block';
};

// Function to add leaves
function addLeaves(subjectId, inputId) {
  var countElement = document.getElementById(subjectId);
  var inputElement = document.getElementById(inputId);
  var count = parseInt(countElement.innerText);
  var leavesToAdd = parseInt(inputElement.value) || 0;
  count += leavesToAdd;
  countElement.innerText = count;

  // Store the updated count in local storage
  localStorage.setItem(subjectId, count);
  inputElement.value = '';
}

// Function to subtract leaves
function subtractLeaves(subjectId, inputId) {
  var countElement = document.getElementById(subjectId);
  var inputElement = document.getElementById(inputId);
  var count = parseInt(countElement.innerText);
  var leavesToSubtract = parseInt(inputElement.value) || 0;
  count -= leavesToSubtract;
  countElement.innerText = Math.max(count, 0); // Ensure count doesn't go below zero

  // Store the updated count in local storage
  localStorage.setItem(subjectId, countElement.innerText);
  inputElement.value = '';
}

// On page load, retrieve leave counts from local storage
window.onload = function() {
  var subjects = document.querySelectorAll('.subject');
  subjects.forEach(function(subject) {
    var countId = subject.querySelector('span').id;
    var storedCount = localStorage.getItem(countId);
    if (storedCount !== null) {
      document.getElementById(countId).innerText = storedCount;
    }
  });
};

// Function to add a new subject
function addSubject() {
  var subjectName = prompt("Enter the name of the subject:");
  if (subjectName) {
    var subjectsDiv = document.getElementById('subjects');
    var newSubject = document.createElement('div');
    newSubject.className = 'subject';
    newSubject.innerHTML = `
      <h2>${subjectName}</h2>
      <p>Leave Count: <span id="${subjectName.toLowerCase()}Count">0</span></p>
      <div>
        <input type="number" id="${subjectName.toLowerCase()}Input" placeholder="Enter number">
        <button onclick="addLeaves('${subjectName.toLowerCase()}Count', '${subjectName.toLowerCase()}Input')">Add</button>
        <button onclick="subtractLeaves('${subjectName.toLowerCase()}Count', '${subjectName.toLowerCase()}Input')">Subtract</button>
      </div>
    `;
    subjectsDiv.appendChild(newSubject);
    storeSubjects();
  }
}

// ... (previous functions)

// Function to open the add subject modal
function addSubject() {
  var addModal = document.getElementById('addModal');
  addModal.style.display = 'block';
}

// Function to close the add subject modal
function closeAddModal() {
  var addModal = document.getElementById('addModal');
  addModal.style.display = 'none';
}

// Function to submit the subject form
function submitSubject() {
  var subjectName = document.getElementById('subjectName').value;
  if (subjectName) {
    var subjectsDiv = document.getElementById('subjects');
    var newSubject = document.createElement('div');
    newSubject.className = 'subject';
    newSubject.innerHTML = `
      <h2>${subjectName}</h2>
      <p>Leave Count: <span id="${subjectName.toLowerCase()}Count">0</span></p>
      <div>
        <input type="number" id="${subjectName.toLowerCase()}Input" placeholder="Enter number">
        <button onclick="addLeaves('${subjectName.toLowerCase()}Count', '${subjectName.toLowerCase()}Input')">Add</button>
        <button onclick="subtractLeaves('${subjectName.toLowerCase()}Count', '${subjectName.toLowerCase()}Input')">Subtract</button>
      </div>
    `;
    subjectsDiv.appendChild(newSubject);
    closeAddModal();
    storeSubjects(); // Store updated subjects list
    return false; // Prevent form submission
  }
}

function retrieveStoredSubjects() {
  var storedSubjects = localStorage.getItem('subjects');
  if (storedSubjects) {
    document.getElementById('subjects').innerHTML = storedSubjects;
  }

  var subjects = document.querySelectorAll('.subject');
  subjects.forEach(function(subject) {
    var countId = subject.querySelector('span').id;
    var storedCount = localStorage.getItem(countId);
    if (storedCount !== null) {
      document.getElementById(countId).innerText = storedCount;
    }
  });
}

// Function to store subjects in local storage
function storeSubjects() {
  var subjectsDiv = document.getElementById('subjects');
  var subjectsHTML = subjectsDiv.innerHTML;
  localStorage.setItem('subjects', subjectsHTML);
}

// Call retrieveStoredSubjects on window load
window.onload = function() {
  retrieveStoredSubjects();
};

// Function to remove a subject
function removeSubject() {
  var subjectList = [];
  var subjects = document.querySelectorAll('.subject');
  subjects.forEach(function(subject) {
    var subjectName = subject.querySelector('h2').textContent;
    subjectList.push(subjectName);
  });

  if (subjectList.length === 0) {
    alert("There are no subjects to remove.");
  } else {
    displayRemoveModal(subjectList);
  }
}

// Function to display the remove modal
function displayRemoveModal(subjectList) {
  var removeModal = document.createElement('div');
  removeModal.id = 'removeModal';
  removeModal.innerHTML = `
    <div id="removeModalContent">
      <h2>Select subjects to remove:</h2>
      ${subjectList.map(subject => `
        <div class="subject-checkbox">
          <input type="checkbox" id="${subject.toLowerCase()}Checkbox" value="${subject}">
          <label for="${subject.toLowerCase()}Checkbox">${subject}</label>
        </div>
      `).join('')}
      <button onclick="removeSelectedSubjects()">Remove</button>
    </div>
  `;
  document.body.appendChild(removeModal);
  removeModal.style.display = 'flex';
}

// Function to remove selected subjects
function removeSelectedSubjects() {
  var checkboxes = document.querySelectorAll('.subject-checkbox input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      var subjectName = checkbox.value;
      var subjects = document.querySelectorAll('.subject');
      subjects.forEach(function(subject) {
        var h2 = subject.querySelector('h2');
        if (h2 && h2.textContent === subjectName) {
          subject.remove();
        }
      });
    }
  });
  closeRemoveModal();
  storeSubjects();
}

// Function to close the remove modal
function closeRemoveModal() {
  var removeModal = document.getElementById('removeModal');
  removeModal.style.display = 'none';
  removeModal.parentNode.removeChild(removeModal);
}
