function fetchComments(postId) {

    fetch(`/comments/${postId}`)
        .then(response => response.json())
        .then(comments => {
            let html = '';
            const maxCommentsToShow = 5;

            if (comments.length > 0) {
                html += '<hr>';
                for (var count = 0; count < Math.min(maxCommentsToShow, comments.length); count++) {
                    let rawDate = new Date(comments[count].comment_date);
                    let formattedDate = `${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(2, '0')}-${String(rawDate.getDate()).padStart(2, '0')} ${String(rawDate.getHours()).padStart(2, '0')}:${String(rawDate.getMinutes()).padStart(2, '0')}`;
                    if (!comments[count].id_creator) {
                        html += '<div class="comment_post_list">';
                        html += '<div class="comment_post_user_data">';
                        html += '<img src="' + comments[count].img_user + '" alt="profile">';
                        html += '<div class="comment_data">';
                        html += '<div class="comment_user_container">';
                        html += '<span class="comment_username">' + comments[count].name + '</span>';
                        html += '<span class="comment_time">' + formattedDate + '</span>';
                        html += '</div>';
                        html += '<span class="comment_data_text">' + comments[count].comment + '</span>';
                        html += '</div> ';
                        html += '<div class="tooltip_comment">';
                        html += '<i id="tooltip_comment_click" class="material-icons">more_horiz</i>';
                        html += '<div class="tooltip_comment_bar" id="tooltip_comment_bar">';
                        html += '<div class="tooltip-content">';
                        html += '<a href="#" class="tooltip-option" id="edit_comment">แก้ไข</a>';
                        html += '<a href="#" class="tooltip-option" id="delete_comment">ลบ</a>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                    } else if (!comments[count].id_user) {
                        html += '<div class="comment_post_list">';
                        html += '<div class="comment_post_user_data">';
                        html += '<img src="' + comments[count].img_creator + '" alt="profile">';
                        html += '<div class="comment_data">';
                        html += '<div class="comment_user_container">';
                        html += '<span class="comment_creator">' + comments[count].creator_name + ' <i class="fa-solid fa-user-pen"></i></span>';
                        html += '<span class="comment_time">' + formattedDate + '</span>';
                        html += '</div>';
                        html += '<span class="comment_data_text">' + comments[count].comment + '</span>';
                        html += '</div> ';
                        html += '<div class="tooltip_comment">';
                        html += '<i id="tooltip_comment_click" class="material-icons">more_horiz</i>';
                        html += '<div class="tooltip_comment_bar" id="tooltip_comment_bar">';
                        html += '<div class="tooltip-content">';
                        html += '<a href="#" class="tooltip-option" id="edit_comment">แก้ไข</a>';
                        html += '<a href="#" class="tooltip-option" id="delete_comment">ลบ</a>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    }
                }

                if (comments.length > maxCommentsToShow) {
                    html += '<div class="readMoreBtn_div">';
                    html += '<a class="readMoreBtn">↓ Read more ↓</a>';
                    html += '</div>';
                }

            } else {

            }

            const comments_post = document.getElementById(`commentPost_${postId}`);
            comments_post.innerHTML = html;

            const readMoreBtn = comments_post.querySelector('.readMoreBtn');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', () => {
                    const commentsToShow = comments.slice(maxCommentsToShow);

                    let additionalHtml = '';
                    for (let i = 0; i < commentsToShow.length; i++) {
                        let rawDate = new Date(comments[count].comment_date);
                        let formattedDate = `${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(2, '0')}-${String(rawDate.getDate()).padStart(2, '0')} ${String(rawDate.getHours()).padStart(2, '0')}:${String(rawDate.getMinutes()).padStart(2, '0')}`;
                        if (!commentsToShow[i].id_creator) {
                            additionalHtml += '<div class="comment_post_list">';
                            additionalHtml += '<div class="comment_post_user_data">';
                            additionalHtml += '<img src="' + commentsToShow[i].img_user + '" alt="profile">';
                            additionalHtml += '<div class="comment_data">';
                            additionalHtml += '<div class="comment_user_container">';
                            additionalHtml += '<span class="comment_username">' + commentsToShow[i].name + '</span>';
                            additionalHtml += '<span class="comment_time">' + formattedDate + '</span>';
                            additionalHtml += '</div>';
                            additionalHtml += '<span class="comment_data_text">' + commentsToShow[i].comment + '</span>';
                            additionalHtml += '</div> ';
                            additionalHtml += '<div class="tooltip_comment">';
                            additionalHtml += '<i id="tooltip_comment_click" class="material-icons">more_horiz</i>';
                            additionalHtml += '<div class="tooltip_comment_bar" id="tooltip_comment_bar">';
                            additionalHtml += '<div class="tooltip-content">';
                            additionalHtml += '<a href="#" class="tooltip-option" id="edit_comment">แก้ไข</a>';
                            additionalHtml += '<a href="#" class="tooltip-option" id="delete_comment">ลบ</a>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                        } else if (!commentsToShow[i].id_user) {
                            additionalHtml += '<div class="comment_post_list">';
                            additionalHtml += '<div class="comment_post_user_data">';
                            additionalHtml += '<img src="' + commentsToShow[i].img_creator + '" alt="profile">';
                            additionalHtml += '<div class="comment_data">';
                            additionalHtml += '<div class="comment_user_container">';
                            additionalHtml += '<span class="comment_creator">' + commentsToShow[i].creator_name + ' <i class="fa-solid fa-user-pen"></i></span>';
                            additionalHtml += '<span class="comment_time">' + formattedDate + '</span>';
                            additionalHtml += '</div>';
                            additionalHtml += '<span class="comment_data_text">' + commentsToShow[i].comment + '</span>';
                            additionalHtml += '</div> ';
                            additionalHtml += '<div class="tooltip_comment">';
                            additionalHtml += '<i id="tooltip_comment_click" class="material-icons">more_horiz</i>';
                            additionalHtml += '<div class="tooltip_comment_bar" id="tooltip_comment_bar">';
                            additionalHtml += '<div class="tooltip-content">';
                            additionalHtml += '<a href="#" class="tooltip-option" id="edit_comment">แก้ไข</a>';
                            additionalHtml += '<a href="#" class="tooltip-option" id="delete_comment">ลบ</a>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                            additionalHtml += '</div>';
                        }
                    }

                    const comments_post = document.getElementById(`commentPost_${postId}`);
                    comments_post.insertAdjacentHTML('beforeend', additionalHtml);
                    readMoreBtn.style.display = 'none';

                    const commentDivs = comments_post.querySelectorAll('.comment_post_list');

                    commentDivs.forEach(commentDiv => {
                        commentDiv.addEventListener('mouseover', () => {
                            const tooltip_comment = commentDiv.querySelector('.tooltip_comment');
                            tooltip_comment.style.display = 'block';
                        });

                        commentDiv.addEventListener('mouseout', () => {
                            const tooltip_comment = commentDiv.querySelector('.tooltip_comment');
                            tooltip_comment.style.display = 'none';
                        });

                        const tooltipCommentClick = commentDiv.querySelector('.tooltip_comment_click');
                        tooltipCommentClick.addEventListener('click', (event) => {
                            event.stopPropagation();
                            const tooltipCommentBar = commentDiv.querySelector('.tooltip_comment_bar');
                            tooltipCommentBar.style.display = tooltipCommentBar.style.display === 'block' ? 'none' : 'block';
                        });

                    });

                });

            }

            const commentDivs = comments_post.querySelectorAll('.comment_post_list');

            // Add event listeners to each comment
            commentDivs.forEach(commentDiv => {
                commentDiv.addEventListener('mouseover', () => {
                    const tooltip_comment = commentDiv.querySelector('.tooltip_comment');
                    tooltip_comment.style.display = 'block';
                });

                commentDiv.addEventListener('mouseout', () => {
                    const tooltip_comment = commentDiv.querySelector('.tooltip_comment');
                    tooltip_comment.style.display = 'none';
                });

                const tooltipCommentClick = commentDiv.querySelector('.tooltip_comment_click');
                tooltipCommentClick.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const tooltipCommentBar = commentDiv.querySelector('.tooltip_comment_bar');
                    tooltipCommentBar.style.display = tooltipCommentBar.style.display === 'block' ? 'none' : 'block';
                });

            });

        })
        .catch(error => console.error(`Error fetching comments for post ${postId}:`, error));
}