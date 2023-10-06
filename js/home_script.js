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
                function truncateDescription(description) {
                    const maxLength = 50; // Set the maximum length for the description
                
                    if (description.length > maxLength) {
                        return description.slice(0, maxLength) + '...';
                    }
                
                    return description;
                }

                var html = '<ul class="profile_search">';

                if (data.length > 0) {
                    for (var count = 0; count < data.length; count++) {
                        html += '<li class="search_result">';
                        html += '<a href="/' + data[count].creator_name + '">';
                        html += '<img src="' + data[count].img + '" alt="">';
                        html += '<div class="creator_info">';
                        html += '<span class="creator_name">' + data[count].creator_name + '</span>';
                        html += '<span class="creator_desc">' + truncateDescription(data[count].creator_desc) + '</span>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    }
                }
                else {
                    html += '<li class="search_result">';
                    html += '<div class="center_data">';
                    html += '<span class="nodata">ไม่พบคริเอเตอร์ของคุณ.</span>';
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
var search_content = document.getElementById("search_content");

search_element.onkeyup = async function () {
    var query = search_element.value;
    await load_data(query);

    // Check if the input value is empty
    if (query.trim() === '') {
        search_content.classList.remove("show_content");
    }
};

search_element.onfocus = async function () {
    var query = search_element.value;
    await load_data(query);

    // Check if the input value is empty
    if (query.trim() === '') {
        search_content.classList.remove("show_content");
    }
};