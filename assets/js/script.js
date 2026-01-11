// menu_trigger
$(".nav-mobile_trigger").click(function () {
  $(".gnav").toggleClass("opened");
});
$(".nav-mobile_trigger").click(function () {
  $(".nav-mobile_trigger_icon").toggleClass("animated");
});

// GSAP Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // セクションのフェードイン
  const sections = document.querySelectorAll(".page_section");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        autoAlpha: 0, // opacity: 0 + visibility: hidden
        y: 30,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // ビューポートの上から80%の位置で発火
          // markers: true, // デバッグ用マーカー（必要に応じて有効化）
        },
      }
    );
  });

  // プロジェクトボックスの時間差フェードイン
  const projectLists = document.querySelectorAll(".row");
  projectLists.forEach((list) => {
    const boxes = list.querySelectorAll("li"); // .col-6 が li タグ
    if (boxes.length > 0) {
      gsap.fromTo(
        boxes,
        {
          autoAlpha: 0,
          y: 20,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1, // 0.1秒ずつ遅れて表示
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
          },
        }
      );
    }
  });
});