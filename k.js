// FILTERABLE GALLERY https://www.bijanrai.com.np/2023/10/filterable-image-gallery.html
function handleFiltering() {
  var filterContainer = document.querySelector(".gallery-filter");
  var galleryItems = document.querySelectorAll(".gallery-item");
  var isFirstClick = true;
  var activeFilterItem = null;

  function removeAllActiveClasses() {
      filterContainer.querySelectorAll(".filter-item").forEach(function (item) {
          item.classList.remove("active");
      });
  }

  function filterGalleryItems(filterValue) {
      galleryItems.forEach(function (item) {
          if (filterValue === 'all' || item.id === filterValue) {
              item.classList.remove("hide");
              item.classList.add("show");
          } else {
              item.classList.remove("show");
              item.classList.add("hide");
          }
      });
  }

  filterContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("filter-item")) {
          var filterValue = event.target.getAttribute("data-filter");

          if (isFirstClick) {
              removeAllActiveClasses();
              event.target.classList.add("active");
              activeFilterItem = event.target;
              filterGalleryItems(filterValue);
              isFirstClick = false;
          } else {
              if (event.target === activeFilterItem) {
                  removeAllActiveClasses();
                  allFilterItem.classList.add("active");
                  filterValue = 'all';
                  filterGalleryItems(filterValue);
                  isFirstClick = true;
              } else {
                  removeAllActiveClasses();
                  event.target.classList.add("active");
                  activeFilterItem = event.target;
                  filterGalleryItems(filterValue);
                  isFirstClick = false;
              }
          }
      }
  });

  var allFilterItem = filterContainer.querySelector("[data-filter='all']");
  allFilterItem.classList.add("active");
}

handleFiltering();

function sortYears() {
  var filterContainer = document.querySelector(".gallery-filter");
  var years = [];

  filterContainer.querySelectorAll(".filter-item[data-filter]").forEach(function (item) {
      var year = parseInt(item.getAttribute("data-filter"), 10);
      if (!isNaN(year) && years.indexOf(year) === -1) {
          years.push(year);
      }
  });

  years.sort(function (a, b) {
      return a - b;
  });

  var allFilterItem = filterContainer.querySelector("[data-filter='all']");
  filterContainer.insertBefore(allFilterItem, filterContainer.firstChild);

  filterContainer.querySelectorAll(".filter-item[data-filter]").forEach(function (item) {
      item.parentNode.removeChild(item);
  });

  years.forEach(function (year) {
      var filterItem = document.createElement("span");
      filterItem.className = "filter-item";
      filterItem.setAttribute("data-filter", year.toString());
      filterItem.textContent = year.toString();
      filterContainer.appendChild(filterItem);
  });

  allFilterItem.classList.add("active");
  filterContainer.appendChild(allFilterItem);
}

sortYears();

// MODAL https://www.w3schools.com/howto/howto_css_modals.asp
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function openModal() {
modal.style.display = "block";
}

function closeModal() {
modal.style.display = "none";
}

btn.addEventListener("click", openModal);
span.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
if (event.target == modal) {
  closeModal();
}
});

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

async function postData(url, formData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    });

    if (response.ok) {
      console.log('Item added successfully');
      closeModal();
      // Fetch and update data after adding a new item
      await init();
    } else {
      throw new Error('Error adding item');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

document.getElementById('add-item-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  var formData = {
    name: document.getElementById('name').value,
    year: document.getElementById('year').value,
    poster: document.getElementById('poster').value,
    genre: document.getElementById('genre').value,
    description: document.getElementById('description').value,
  };

  const url = 'https://webtech.labs.vu.nl/api24/45bc18aa';

  try {
    await postData(url, formData);
  } catch (error) {
    console.error('Error posting data:', error);
  }
});

async function resetDatabase(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      console.log('Database reset successfully');
      // Fetch and update data after resetting the database
      await init();
    } else {
      throw new Error('Error resetting database');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

document.getElementById('resetBtn').addEventListener('click', async function () {
  const resetUrl = 'https://webtech.labs.vu.nl/api24/45bc18aa/reset';

  try {
    await resetDatabase(resetUrl);
  } catch (error) {
    console.error('Error resetting database:', error);
  }
});

async function init() {
  const url = 'https://webtech.labs.vu.nl/api24/45bc18aa';

  try {
    const data = await fetchData(url);

    // Clear existing data
    document.querySelector('.row').innerHTML = '';
    document.querySelector('.gallery-filter').innerHTML = '';

    if (data.length > 0) {
      data.forEach(author => {
        let gallerySpan = document.createElement('span');
        gallerySpan.className = 'filter-item';
        gallerySpan.setAttribute('data-filter', `${author.year}`);
        gallerySpan.innerHTML = `${author.year}`;
    
        document.querySelector('.gallery-filter').appendChild(gallerySpan);
    });
    

    data.forEach(author => {

        let galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.id = `${author.year}`;

        let galleryItemInner = document.createElement('div');
        galleryItemInner.className = 'gallery-item-inner';

        let search = document.createElement('div');
        search.className = 'search';

        let name = document.createElement('div');
        name.innerHTML = `${author.name}`;

        let year = document.createElement('div');
        year.innerHTML = `${author.year}`;

        let genre = document.createElement('div');
        genre.innerHTML = `${author.genre}`;

        let poster = document.createElement('img');
        poster.src = `${author.poster}`;

        let description = document.createElement('p');
        description.innerHTML = `${author.description}`;

        search.appendChild(name);
        search.appendChild(year);
        search.appendChild(genre);

        galleryItemInner.appendChild(search);
        galleryItemInner.appendChild(poster);
        galleryItemInner.appendChild(description);

        galleryItem.appendChild(galleryItemInner);

        let updateButton = document.createElement('button');
        updateButton.innerHTML = 'Update';
        updateButton.id = `updateButton_${author.id}`;
        updateButton.addEventListener('click', function() {
        updateItem(author.id); 
        });

        galleryItemInner.appendChild(updateButton);

        document.querySelector('.row').appendChild(galleryItem);
    });
      handleFiltering();
      sortYears();
    } else {
      console.log('No authors found in the response.');
    }
  } catch (error) {
    console.log(error);
  }
}

init();

// UPDATE BUTTON  
function updateItem(itemId) {
  const updateUrl = `https://webtech.labs.vu.nl/api24/45bc18aa/item/${itemId}`;

  openModal();

  // Event listener for form submission
  document.getElementById("add-item-form").addEventListener("submit", function (event) {
      event.preventDefault();

      // Get the updated data from the form
      var updatedFormData = {
          name: document.getElementById("name").value,
          year: document.getElementById("year").value,
          poster: document.getElementById("poster").value,
          genre: document.getElementById("genre").value,
          description: document.getElementById("description").value
      };

      // PUT request to update the item
      let updateRequest = new Request(updateUrl, {
          method: 'PUT',
          body: JSON.stringify(updatedFormData),
          headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
          })
      });

      fetch(updateRequest)
          .then(function (response) {
              if (response.ok) {
                  console.log(`Item with ID ${itemId} updated successfully`);

                  // Remove the existing HTML element representing the old version
                  var oldItemElement = document.getElementById(itemId);
                  if (oldItemElement) {
                      oldItemElement.remove();
                  }

                  // Append a new HTML element with the updated data to the appropriate location
                  var newRow = document.createElement('div');
                  newRow.className = 'row';

                  var updatedItemElement = createGalleryItem(updatedFormData);
                  newRow.appendChild(updatedItemElement);

                  document.querySelector('.container-gallery').appendChild(newRow);

                  closeModal(); // Close the modal after successful update
              } else {
                  console.error(`Error updating item with ID ${itemId}`);
              }
          })
          .catch(function (error) {
              console.error('Fetch error:', error);
          });
  });
}

// Helper function to create a gallery item HTML element
function createGalleryItem(itemData) {
  var galleryItem = document.createElement('div');
  galleryItem.className = 'gallery-item';
  galleryItem.id = itemData.year;

  var galleryItemInner = document.createElement('div');
  galleryItemInner.className = 'gallery-item-inner';

  var search = document.createElement('div');
  search.className = 'search';

  var name = document.createElement('div');
  name.innerHTML = itemData.name;

  var year = document.createElement('div');
  year.innerHTML = itemData.year;

  var genre = document.createElement('div');
  genre.innerHTML = itemData.genre;

  var poster = document.createElement('img');
  poster.src = itemData.poster;

  var description = document.createElement('p');
  description.innerHTML = itemData.description;

  search.appendChild(name);
  search.appendChild(year);
  search.appendChild(genre);

  galleryItemInner.appendChild(search);
  galleryItemInner.appendChild(poster);
  galleryItemInner.appendChild(description);

  galleryItem.appendChild(galleryItemInner);

  return galleryItem;
}



function searchFunction() {
  var input, filter, gallery, items, i, name;
  input = document.getElementById('searchInput');
  filter = input.value.replace(/\s/g, '').toUpperCase();
  
  gallery = document.querySelector('.container-gallery');
  items = gallery.getElementsByClassName('gallery-item');

  for (i = 0; i < items.length; i++) {
    name = items[i].querySelector('.search').innerText.replace(/\s/g, '').toUpperCase();
    genre = items[i].querySelector('.search').innerText.replace(/\s/g, '').toUpperCase();
    if (name.includes(filter) || genre.includes(filter)) {
      items[i].style.display = "";
    } 
    else if (name.includes(filter) && genre.includes(filter)) {
      items[i].style.display = "";
    }
    else {
      items[i].style.display = "none";
    }
  }
}

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