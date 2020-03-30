"use strict";

const allEventTypes = {
  tech: "Technology",
  birthday: "Birthday",
  wedding: "Wedding"
};

const allEvents = [
  {
    title: "HTML Meetup",
    time: new Date(),
    type: "tech",
    place: "Kharadi, Pune",
    description: "This is a tech event. Some description here.."
  },
  {
    title: "Rahul's Birthday Bash",
    time: new Date(),
    type: "birthday",
    place: "Taj, Pune",
    description: "Rahul's 6th birthday"
  },
  {
    title: "CSS Meetup",
    time: new Date(),
    type: "tech",
    place: "Talentica, Pune",
    description: "Deep dive into CSS and SCSS."
  }
];

let modal = false;

function renderEvents() {
  const eventTypes = allEvents.reduce((acc, curr, idx, src) => {
    const currentType = curr.type;
    if (acc.indexOf(currentType) === -1) {
      acc.push(currentType);
    }
    return acc;
  }, []);
  console.log("renderEvents -> eventTypes", eventTypes);
  const allEventGroupsRef = document.getElementById("allEventGroups");
  allEventGroupsRef.innerHTML = "";
  eventTypes.forEach(type => {
    console.log("renderEvents -> allEventGroupsRef", allEventGroupsRef);
    const eventGroupRef = document.createElement("div");
    eventGroupRef.setAttribute("class", "eventGroup");

    // add title
    const eventGroupNameRef = document.createElement("h4");
    eventGroupNameRef.setAttribute("class", "groupName");
    eventGroupNameRef.innerText = allEventTypes[type];
    eventGroupRef.appendChild(eventGroupNameRef);

    // add eventContainer
    const eventsContainerRef = document.createElement("div");
    eventsContainerRef.setAttribute("class", "eventsContainer");
    eventGroupRef.appendChild(eventsContainerRef);

    allEventGroupsRef.appendChild(eventGroupRef);

    // add events
    const events = allEvents.filter(event => event.type === type);
    events.forEach(event => {
      const eventRef = document.createElement("div");
      eventRef.setAttribute("class", "event");

      // title
      const eventTitleRef = document.createElement("h3");
      eventTitleRef.setAttribute("class", "title");
      eventTitleRef.innerText = event.title;
      eventRef.appendChild(eventTitleRef);

      // time
      const eventTimeRef = document.createElement("h4");
      eventTimeRef.setAttribute("class", "time");
      eventTimeRef.innerText = event.time;
      eventRef.appendChild(eventTimeRef);

      // place
      const eventPlaceRef = document.createElement("h4");
      eventPlaceRef.setAttribute("class", "place");
      eventPlaceRef.innerText = event.place;
      eventRef.appendChild(eventPlaceRef);

      // description
      const eventDescriptioneRef = document.createElement("p");
      eventDescriptioneRef.setAttribute("class", "description");
      eventDescriptioneRef.innerText = event.description;
      eventRef.appendChild(eventDescriptioneRef);

      eventsContainerRef.appendChild(eventRef);
    });
  });
}

function toggleModal() {
  modal = !modal;
  renderModal();
}

function renderModal() {
  const modalRef = document.getElementById("modal");
  if (modal) {
    modalRef.setAttribute("style", "display:flex");
  } else {
    modalRef.setAttribute("style", "display:none");
  }
}

function addEvent() {
  const modalRef = document.getElementById("modal");
  const children = modalRef.children;
  console.log("addEvent -> children", children);

  const event = {
    title: children.title.value,
    place: children.place.value,
    time: children.time.value,
    type: children.type.value,
    description: children.description.value
  };
  console.log("addEvent -> event", event);

  // Validation
  if (!event.title) {
    window.alert("Add a valid title");
    return false;
  }
  if (!event.place) {
    window.alert("Add a valid place");
    return false;
  }
  if (!event.time) {
    window.alert("Add a valid date");
    return false;
  }
  if (!event.type) {
    window.alert("Add a valid type");
    return false;
  }
  if (!event.description) {
    window.alert("Add a valid description");
    return false;
  }

  allEvents.push(event);
  renderEvents();
  toggleModal();
  return true;
}

function init() {
  renderEvents();
  renderModal();
}

window.onload = init;
