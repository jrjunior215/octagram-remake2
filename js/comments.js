function fetchComments(postId) {
    fetch(`/comments/${postId}`)
        .then(response => response.json())
        .then(comments => {
            displayComments(comments, postId);
        })
        .catch(error => console.error(`Error fetching comments for post ${postId}:`, error));
}

function displayComments(comments, postId) {
    const commentsContainer = document.getElementById(`commentPost_${postId}`);
    commentsContainer.innerHTML = '';

    const maxCommentsToShow = 5;

    if (comments.length > 0) {

        commentsContainer.innerHTML += '<hr>';

        for (let i = 0; i < Math.min(maxCommentsToShow, comments.length); i++) {
            const comment = comments[i];
            const formattedDate = formatCommentDate(comment.comment_date);
            const commentHTML = createCommentHTML(comment, formattedDate);
            commentsContainer.innerHTML += commentHTML;
        }

    } else {

    }

    if (comments.length > maxCommentsToShow) {
        commentsContainer.innerHTML += '<div class="readMoreBtn_div"><a class="readMoreBtn">↓ Read more ↓</a></div>';
        const readMoreBtn = commentsContainer.querySelector('.readMoreBtn');
        readMoreBtn.addEventListener('click', () => {
            readMoreBtn.style.display = 'none'; 
            const additionalComments = comments.slice(maxCommentsToShow);
            additionalComments.forEach(comment => {
                const formattedDate = formatCommentDate(comment.comment_date);
                const commentHTML = createCommentHTML(comment, formattedDate);
                commentsContainer.innerHTML += commentHTML;
            });
            addCommentEventListeners(postId);  
        });
    }

    addCommentEventListeners(postId);
}

function createCommentHTML(comment, formattedDate) {
    const userImage = comment.id_creator ? comment.img_creator : comment.img_user;
    const userName = comment.id_creator ? `${comment.creator_name} <i class="fa-solid fa-user-pen"></i>` : comment.name;

    return `
        <div class="comment_post_list">
            <div class="comment_post_user_data">
                <img src="${userImage}" alt="profile">
                <div class="comment_data">
                    <div class="comment_user_container">
                        <span class="comment_username">${userName}</span>
                        <span class="comment_time">${formattedDate}</span>
                    </div>
                    <span class="comment_data_text">${comment.comment}</span>
                </div> 
                <div class="tooltip_comment">
                    <i class="material-icons" id="tooltip_comment_click">more_horiz</i>
                    <div class="tooltip_comment_bar">
                        <div class="tooltip-content">
                            <a href="#" class="tooltip-option">แก้ไข</a>
                            <a href="#" class="tooltip-option">ลบ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatCommentDate(rawDate) {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function addCommentEventListeners() {
    const comments = document.querySelectorAll('.comment_post_list');
    comments.forEach(comment => {
        comment.addEventListener('mouseover', () => {
            const tooltip_comment = comment.querySelector('.tooltip_comment');
            tooltip_comment.style.display = 'block';
        });

        comment.addEventListener('mouseout', () => {
            const tooltip_comment = comment.querySelector('.tooltip_comment');
            tooltip_comment.style.display = 'none';
        });
    });

    const tooltipCommentClicks = document.querySelectorAll('.tooltip_comment');
    tooltipCommentClicks.forEach(tooltipCommentClick => {
        tooltipCommentClick.addEventListener('click', (event) => {
            console.log("click")
            event.stopPropagation();
            const tooltipCommentBar = tooltipCommentClick.nextElementSibling;
            tooltipCommentBar.style.display = tooltipCommentBar.style.display === 'block' ? 'none' : 'block';
        });
    });
}