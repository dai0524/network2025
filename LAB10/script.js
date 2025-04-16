function init() {
            //var dataUrl = 'https://api.unsplash.com/photos?client_id=812193ef71ca946e361ed541979a0cfd91e9419a19235fd05f51ea14233f020a&per_page=30';
            var dataUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';
            // flickr api (getRecent) documentation: https://www.flickr.com/services/api/flickr.photos.getRecent.html

            document.getElementById('getimg').addEventListener('click', getimg2);
            document.getElementById('help').addEventListener('click', function () {
                let help_content = document.getElementById('help-content');
                if (help_content.style.display == 'none' || help_content.style.display == '') {
                    help_content.style.display = 'block';
                } else {
                    help_content.style.removeProperty('display');
                }
            });
            document.querySelector('.close').addEventListener('click', function () {
                document.getElementById('help-content').style.display = 'none';
            });

            // traditional way to get data
            function getimg() {
                console.log('getimg() triggered by button click');
                // remove all existing images
                console.log('Trying to remove all existing images');
                let gal = document.getElementById('gallery');
                while (gal.firstChild) {
                    gal.removeChild(gal.firstChild);
                }
                let xhr = new XMLHttpRequest();
                xhr.open('GET', dataUrl, true);
                xhr.send();
                xhr.onload = function () {
                    let data = JSON.parse(this.responseText);
                    //add_new_img(data);
                    add_new_img_flickr(data);
                }
            }

            // fetch way to get data
            function getimg2() {
                console.log('getimg() triggered by button click');
                // remove all existing images
                console.log('Trying to remove all existing images');
                let gal = document.getElementById('gallery');
                while (gal.firstChild) {
                    gal.removeChild(gal.firstChild);
                }
                /*
                const req = new Request(dataUrl, {
                    method: 'GET',
                    mode: 'cors',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                fetch(req).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    add_new_img(data);
                });
                */

                fetch(dataUrl, { method: 'GET' }) // promise design pattern
                    .then(res => {  // => ES6 arrow function, works like lambda function
                        //console.log(res);
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.text();
                    }).catch(error => {
                        console.error('Error:', error);
                    }).then(data => {
                        return JSON.parse(data);
                    }).then(photo => {
                        add_new_img_flickr(photo);
                    });
            }

            function add_new_img_flickr(dataset) {
                let gal = document.getElementById('gallery');
                dataset.photos.photo.forEach(function (item) {
                    //console.log(item);
                    let img = document.createElement('img');
                    let server = item.server;
                    let id = item.id;
                    let secret = item.secret;
                    //img.setAttribute('src', 'https://live.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg');
                    console.log(id);
                    get_flickr_img_url(id).then(url => {
                        img.setAttribute('src', url);
                    })
                    img.onclick = function () {
                        window.open('https://www.flickr.com/photos/' + item.owner + '/' + item.id);
                    }
                    img.setAttribute('title', item.title);
                    img.setAttribute('onload', 'this.parentNode.removeChild(this.nextSibling); this.style.removeProperty("display")');
                    img.style.display = 'none';
                    gal.appendChild(img);
                    gal.appendChild(createLoadingElement());
                })
            }

            function get_flickr_img_url(id) {
                let img_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id=' + id + '&format=json&nojsoncallback=1';
                return fetch(img_Url, { method: 'GET' })
                    .then(res => {
                        return res.text();
                    }).then(data => {
                        return JSON.parse(data);
                    }).then(photo => {
                        //console.log(photo.sizes.size[photo.sizes.size.length-1].source);
                        return photo.sizes.size[photo.sizes.size.length - 1].source; // original size
                    });
            }

            function add_new_img(dataset) {
                let gal = document.getElementById('gallery');
                dataset.forEach(function (item) {
                    console.log(item);
                    let img = document.createElement('img');
                    img.setAttribute('src', item.urls.small);
                    gal.appendChild(img);
                });
            }

            /*
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading</div>
            </div>
            */
            function createLoadingElement() {
                let loadingContainer = document.createElement('div');
                loadingContainer.className = 'loading-container';
                let loadingSpinner = document.createElement('div');
                loadingSpinner.className = 'loading-spinner';
                let loadingText = document.createElement('div');
                loadingText.className = 'loading-text';
                loadingText.textContent = 'Loading';
                loadingContainer.appendChild(loadingSpinner);
                loadingContainer.appendChild(loadingText);
                return loadingContainer;
            }
        }
