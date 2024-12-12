

//Get the elements
const form = document.getElementById('course-form');
const submitButton = document.getElementById('submit-button');
const pdfButton = document.getElementById('pdf-button');
const courseOutlineDiv = document.getElementById('course-outline');
const fileInput = document.getElementById('file');



// Addevent Listener to the from 
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Get the value from the from
  const instructions = document.getElementById('instructions').value;
  const file = document.getElementById('file').files[0];
  const formData = new FormData();
  // Append the value to the formData
  formData.append('instructions', instructions);
  // Append the file to the formData
  formData.append('file', file);
 // Send the data to server
  const response = await fetch('/api/instructions', {
    // Metthod is Post
    method: 'POST',
    //send the data
    body: formData,
  });
  
  const courseOutline = await response.json();
  //Dispaly the course ouline
  courseOutlineDiv.innerHTML = courseOutline;
});
 // Add event lister to the pdf button
pdfButton.addEventListener('click', async () => {
  const courseOutline = courseOutlineDiv.innerHTML;
  //Sen the course outline to the server
  const pdf = await fetch('/api/generate-pdf', {
    method: 'POST',
    // Set the content type
    headers: { 'Content-Type': 'application/json' },
    // Send the courese outline
    body: JSON.stringify({ courseOutline }),
  });
  //Download the pdf
  const pdfBlob = await pdf.blob();
  // Create s download link
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  //Click the link
  a.href = pdfUrl;
  a.download = 'course-outline.pdf';
  a.click();
})
// Add event lister to the file input
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      // Set the value of the textarea
      document.getElementById('instructions').value = contents;
    };
    reader.readAsText(file);
    //Display the comment section
    document.getElementById('comment-section').style.display = 'block';
  }
}

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const contents = e.target.result;
      // Do something with the file contents
    };
    reader.readAsText(file);
  }
});
  