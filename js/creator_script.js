function MenuController() {
  let menu = document.getElementById('menu_drop');
  menu.classList.toggle("open_menu");
}

document.body.addEventListener("click", function (event) {
  let menu = document.getElementById('menu_drop');
  let containerIcons = document.querySelector('.container_icons');

  if (!containerIcons.contains(event.target)) {
    menu.classList.remove("open_menu");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var clickRemoveButton = document.getElementById("click_remove");
  var ConfirmPopup = document.getElementById("ConfirmPopup");
  var YesConfirmPopup = document.getElementById("YesConfirmPopup");
  var NoConfirmPopup = document.getElementById("NoConfirmPopup");
  var XmarkClose_Confirm = document.getElementById("XmarkClose_Confirm");
  var popUpConfirm = document.querySelector(".pop_up_confirm");

  clickRemoveButton.addEventListener("click", function () {
    ConfirmPopup.classList.add('show_popup');
  });

  YesConfirmPopup.addEventListener("click", function () {
    // Redirect to the specified URL
    var id = "<%=packages[0].id%>";
    window.location.href = "/package/delete?id=" + id;
  });

  NoConfirmPopup.addEventListener("click", function () {
    // Hide the popup
    ConfirmPopup.classList.remove('show_popup');
  });

  XmarkClose_Confirm.addEventListener("click", function () {
    // Hide the popup
    ConfirmPopup.classList.remove('show_popup');
  });

  // Listen for clicks on the document
  document.addEventListener("click", function (event) {
    // Check if the target is not within the .pop_up_confirm element
    if (!popUpConfirm.contains(event.target) && event.target !== clickRemoveButton) {
      ConfirmPopup.classList.remove('show_popup');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var click_post = document.getElementById("click_post");
  var PostPopup = document.getElementById("PostPopup");
  var XmarkClose_Post = document.getElementById("XmarkClose_Post");
  var post_box_choose = document.querySelector(".post_box_choose");

  click_post.addEventListener("click", function () {
    PostPopup.classList.add('show_popup');
  });

  XmarkClose_Post.addEventListener("click", function () {
    // Hide the popup
    PostPopup.classList.remove('show_popup');
  });

  // Listen for clicks on the document
  document.addEventListener("click", function (event) {
    // Check if the target is not within the .pop_up_confirm element
    if (!post_box_choose.contains(event.target) && event.target !== click_post && event.target !== click_post_nav) {
      PostPopup.classList.remove('show_popup');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var click_post = document.getElementById("click_post");
  var click_post_nav = document.getElementById("click_post_nav");
  var PostPopup = document.getElementById("PostPopup");
  var XmarkClose_Post = document.getElementById("XmarkClose_Post");
  var post_box_choose = document.querySelector(".post_box_choose");

  click_post_nav.addEventListener("click", function () {
    PostPopup.classList.add('show_popup');
  });

  XmarkClose_Post.addEventListener("click", function () {
    // Hide the popup
    PostPopup.classList.remove('show_popup');
  });

  // Listen for clicks on the document
  document.addEventListener("click", function (event) {
    // Check if the target is not within the .pop_up_confirm element
    if (!post_box_choose.contains(event.target) && event.target !== click_post && event.target !== click_post_nav) {
      PostPopup.classList.remove('show_popup');
    }
  });
});
