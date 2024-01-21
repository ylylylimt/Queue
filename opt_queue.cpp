window.addEventListener('DOMContentLoaded', (event) => {
    let form = document.querySelector("#add-item-form");
    form.addEventListener("submit", submitHandler);
});
         
function submitHandler(event) {
    event.preventDefault(); 
    var imageUrl = document.getElementById('poster').value;
    var description = document.getElementById('description').value;

    
    let img = document.createElement('img');
    img.src = imageUrl;
    
    let desc = document.createElement('p');
    desc.innerText = description;

    let container = document.querySelector('.gallery');  
    container.appendChild(img);
    container.appendChild(desc);

   
}
