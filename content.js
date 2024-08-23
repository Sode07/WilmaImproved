let colors = [
  "#eaea60", "#b4c6e7", "#ffc577", "#ffccff", "#d6dce4",
  "#c6e0b4", "#ff0000", "#0066ff", "#ffffff", "#DC143C"
];

let ClassElementNumber = 0;
let ClassModule;

function FindClass() {
  const ClassElement = document.getElementsByClassName("block")[ClassElementNumber];
  if (!ClassElement) return;

  const ClassInformation = ClassElement.getElementsByClassName("info")[0];
  const ClassName = ClassInformation.getElementsByClassName("no-underline-link")[0].innerHTML;
  ClassModule = parseInt(ClassName.slice(1, 3));

  if (!isNaN(ClassModule)) {
    ChangeColor();
  }
}

function ChangeColor() {
  const ClassElement = document.getElementsByClassName("block")[ClassElementNumber];
  ClassElement.style.backgroundColor = colors[ClassModule - 1] || "#ffffff";
  ClassElementNumber++;
  FindClass();
}

function GetCurrentWeekday() {
  return document.getElementsByClassName("weekday selected today")[0].id.substring(document.getElementsByClassName("weekday selected today")[0].id.length - 1);
}

function HighlightCurrentLesson() {
  let LessonsOnMon = 0;
  let MonLessons = [];
  let LessonsOnTue = 0;
  let TueLessons = [];
  let LessonsOnWed = 0;
  let WedLessons = [];
  let LessonsOnThu = 0;
  let ThuLessons = [];
  let LessonsOnFri = 0;
  let FriLessons = [];

  let lessons = document.getElementsByClassName("block");

  for (let lesson of lessons) {
    let left = lesson.style.left;
    if (left === "0.2%") {
        LessonsOnMon++;
        MonLessons.push(lesson);
    } 
    else if (left === "20.2%") {
        LessonsOnTue++;
        TueLessons.push(lesson);
    } 
    else if (left === "40.2%") {
        LessonsOnWed++;
        WedLessons.push(lesson);
    } 
    else if (left === "60.2%") {
        LessonsOnThu++;
        ThuLessons.push(lesson);
    } 
    else if (left === "80.2%") {
        LessonsOnFri++;
        FriLessons.push(lesson);
    }
  }

  const day = GetCurrentWeekday();
  let currentLesson = null;

  switch (day) {
    case "1":
        currentLesson = GetCurrentLesson(MonLessons);
        break;
    case "2":
        currentLesson = GetCurrentLesson(TueLessons);
        break;
    case "3":
        currentLesson = GetCurrentLesson(WedLessons);
        break;
    case "4":
        currentLesson = GetCurrentLesson(ThuLessons);
        break;
    case "5":
        currentLesson = GetCurrentLesson(FriLessons);
        break;
  }

  if (currentLesson) {
    const infoSpan = currentLesson.querySelector("span.info");
    if (infoSpan) {
      const links = infoSpan.querySelectorAll("a");
      links.forEach(link => {
          link.style.fontWeight = "bold";
          link.style.color = colors[9] || "#ffffff";
      });
    }
  } 
}

function ParseTimeString(timeString) {
  const timeMatch = timeString.match(/(\d{2}:\d{2})/);
  return timeMatch ? timeMatch[0] : null;
}

function GetCurrentLesson(lessonsArray) {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  for (let lesson of lessonsArray) {
      const timeElement = lesson.querySelector("h3.sr-only");
      if (timeElement) {
          const timeText = timeElement.textContent;
          const startTimeStr = ParseTimeString(timeText.split("Alkamisaika")[1].split("Päättymisaika")[0]);
          const endTimeStr = ParseTimeString(timeText.split("Päättymisaika")[1]);

          if (startTimeStr && endTimeStr) {
              const [startHours, startMinutes] = startTimeStr.split(":").map(Number);
              const [endHours, endMinutes] = endTimeStr.split(":").map(Number);

              const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHours, startMinutes);
              const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes);

              if (now >= startTime && now <= endTime) {
                  return lesson;
              }
          }
      }
  }
  return null;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateColors") {
    colors = request.colors;
    ClassElementNumber = 0;
    FindClass();
  }
});

chrome.storage.sync.get(["colors"], function(result) {
  if (result.colors) {
    colors = result.colors;
  }
  setTimeout(FindClass, 1000);
});

setTimeout(HighlightCurrentLesson, 1000);