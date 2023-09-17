function fetchComments(postId, sessionId) {
    fetch(`/comments/${postId}`)
        .then(response => response.json())
        .then(comments => {
            displayComments(comments, postId, sessionId);
        })
        .catch(error => console.error(`Error fetching comments for post ${postId}:`, error));
}

function autoResizeTextarea() {
    const textareas = document.querySelectorAll('.auto-resize');

    textareas.forEach(textarea => {
        textarea.addEventListener('input', function () {
            this.style.height = '48px';
            this.style.height = this.scrollHeight + 'px';
        });

        textarea.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevents creating a new line
                this.form.submit(); // Submit the form
            }
        });

        textarea.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevents creating a new line
                this.form.submit(); // Submit the form
            }
        });

        textarea.style.height = '48px';
        textarea.style.height = textarea.scrollHeight + 'px';
    });

    const textareas2 = document.querySelectorAll('.auto-resize2');

    textareas2.forEach(textarea => {
        textarea.addEventListener('input', function () {
            this.style.height = '20px';
            this.style.height = this.scrollHeight + 'px';
        });
        textarea.style.height = '20px';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
}

function displayComments(comments, postId, sessionId) {
    const commentsContainer = document.getElementById(`commentPost_${postId}`);
    commentsContainer.innerHTML = '';

    const maxCommentsToShow = 5;

    if (comments.length > 0) {

        commentsContainer.innerHTML += '<hr>';

        for (let i = 0; i < Math.min(maxCommentsToShow, comments.length); i++) {
            const comment = comments[i];
            const formattedDate = formatCommentDate(comment.comment_date);
            const commentHTML = createCommentHTML(comment, formattedDate, sessionId);
            commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
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
                const commentHTML = createCommentHTML(comment, formattedDate, sessionId);
                commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
            });
            addCommentEventListeners();
            autoResizeTextarea();
        });
    }

    addCommentEventListeners();
    autoResizeTextarea();
}

function createCommentHTML(comment, formattedDate, sessionId) {
    const userImage = comment.id_creator ? comment.img_creator : comment.img_user;
    const userName = comment.id_creator ? `<span class="comment_creator">${comment.creator_name} <i class="fa-solid fa-user-pen"></i> </span>` : comment.name;
    let UserID = parseInt(comment.id_user);
    let sessionIdS = parseInt(sessionId);

    if (UserID === sessionIdS) {
        return `
        <div class="comment_post_list">
            <div class="comment_post_user_data">
                <img src="${userImage}" alt="profile">
                <div class="comment_data">
                    <div class="comment_user_container">
                        <span class="comment_username">${userName} [ คุณ ]</span>
                        <span class="comment_time">${formattedDate}</span>
                    </div>
                    <textarea class="commentEdit auto-resize2" name="comment" readonly>${comment.comment}</textarea>
                </div>
                <form class="comment_data_edit" action="/post/comment/edit" method="POST">
                    <div class="comment_user_container">
                    <input type="hidden" name="id_comment" value="${comment.id}">
                    <input type="hidden" name="role" value="USER">
                    <input type="hidden" name="callback" value="home">
                    <textarea class="commentEdit auto-resize" name="comment">${comment.comment}</textarea>
                    </form>
                </div> 
                <div class="tooltip_comment">
                    <i class="material-icons" id="tooltip_comment_click">more_horiz</i>
                    <div class="tooltip_comment_bar">
                        <div class="tooltip-content">
                            <a class="tooltip-option" id="comment_edit">แก้ไข</a>
                            <a href="/post/comment/delete?id_comment=${comment.id}&callback=home&role=USER" class="tooltip-option" id="comment_remove">ลบ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    } else {
        return `
        <div class="comment_post_list">
            <div class="comment_post_user_data">
                <img src="${userImage}" alt="profile">
                <div class="comment_data">
                    <div class="comment_user_container">
                        <span class="comment_username">${userName}</span>
                        <span class="comment_time">${formattedDate}</span>
                    </div>
                    <textarea class="commentEdit auto-resize2" name="comment" readonly>${comment.comment}</textarea>
                </div> 
                <div class="tooltip_comment">
                    <i class="material-icons" id="tooltip_comment_click">more_horiz</i>
                    <div class="tooltip_comment_bar">
                        <div class="tooltip-content">
                            <a href="#" class="tooltip-option">รายงาน</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    }
}

function formatCommentDate(rawDate) {
    const date = new Date(rawDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function addCommentEventListeners() {

    const commentsContainers = document.querySelectorAll('.comment_user');

    commentsContainers.forEach(commentsContainer => {
        const comments = commentsContainer.querySelectorAll('.comment_post_list');

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

        const tooltipComment = commentsContainer.querySelectorAll('.tooltip_comment');
        tooltipComment.forEach(comment => {
            comment.addEventListener('click', () => {
                const tooltip_comment = comment.querySelector('.tooltip_comment_bar');
                tooltip_comment.style.display = 'block';
            });

        });

    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.id == 'comment_edit') {
            const commentData = event.target.closest('.comment_post_list').querySelector('.comment_data');
            const commentDataEdit = event.target.closest('.comment_post_list').querySelector('.comment_data_edit');

            commentData.style.display = 'none';
            commentDataEdit.style.display = 'block';

            const textareaEdit = commentDataEdit.querySelector('textarea'); // Get the textarea inside commentDataEdit
            textareaEdit.style.height = '20px'; // Set an initial height if needed
            textareaEdit.style.height = textareaEdit.scrollHeight + 'px'; // Trigger the resize

            // Add event listener for Esc key
            textareaEdit.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault(); // Prevent default behavior (e.g., closing modal)
                    commentData.style.display = 'block';
                    commentDataEdit.style.display = 'none';
                }
            });

            // Hide the tooltip comment
            const tooltipCommentBar = event.target.closest('.tooltip_comment_bar');
            tooltipCommentBar.style.display = 'none';
        }
    });
}
