function MenuController() {
    let menu = document.getElementById('menu_drop');
    menu.classList.toggle("open_menu");
}

document.body.addEventListener("click", function(event) {
    let menu = document.getElementById('menu_drop');
    let containerIcons = document.querySelector('.container_icons');

    if (!containerIcons.contains(event.target)) {
        menu.classList.remove("open_menu");
    }
});

async function load_data(query = '') {

    let search_content = document.getElementById('search_content');

    if (query === '') {
        search_content.classList.remove("show_content");

    } else {

        search_content.classList.add("show_content");
        await fetch('/search/query?data_query=' + query + '').then(response => response.json())
            .then(data => {
                var html = '<ul class="profile_search">';

                if (data.length > 0) {
                    for (var count = 0; count < data.length; count++) {
                        html += '<li class="search_result">';
                        html += '<a href="/' + data[count].pname + '">';
                        html += '<img src="' + data[count].img + '" alt="">';
                        html += '<div class="creator_info">';
                        html += '<span class="creator_name">' + data[count].pname + '</span>';
                        html += '<span class="creator_desc">Creating website octagram</span>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    }
                }
                else {
                    html += '<li class="search_result">';
                    html += '<div class="center_data">';
                    html += '<span class="nodata">No data found.</span>';
                    html += '</div>';
                    html += '</li>';
                }

                html += '</ul>';

                const search_content = $("#search_content");
                search_content.empty();
                search_content.append(html);

            })
    }

}

var search_element = document.getElementById("autosearch");

search_element.onkeyup = async function () {

    var query = search_element.value;

    await load_data(query);

};

search_element.onfocus = async function () {

    var query = search_element.value;

    await load_data(query);

};