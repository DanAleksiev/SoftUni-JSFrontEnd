window.addEventListener("load", solve);

function solve() {
  const selectors = {
    createButton: document.getElementById("create-task-btn"),
    taskSection: document.getElementById("tasks-section"),
    totalPoints: document.getElementById("total-sprint-points"),
  };
  selectors.createButton.addEventListener("click", newElement);

  const inpSelectors = {
    title: document.getElementById("title"),
    description: document.getElementById("description"),
    label: document.getElementById("label"),
    points: document.getElementById("points"),
    assignee: document.getElementById("assignee"),
  };

  const tasks = {};
  //

  function newElement(e) {
    if (Object.values(inpSelectors).some((selector) => selector.value === "")) {
      return;
    }

    const task = {
      id: `task-${Object.values(tasks).length + 1}`,
      title: inpSelectors.title.value,
      description: inpSelectors.description.value,
      label: inpSelectors.label.value,
      points: Number(inpSelectors.points.value),
      assignee: inpSelectors.assignee.value,
    };

    const icons = {
      Feature: "&#8865;",
      "Low Priority Bug": "&#9737;",
      "High Priority Bug": "&#9888;",
    };
    const labelClasses = {
      Feature: "feature",
      "Low Priority Bug": "low-priority",
      "High Priority Bug": "high-priority",
    };
    const article = createElement(
      "article",
      null,
      ["task-card"],
      task.id,
      selectors.taskSection
    );

    createElement(
      "div",
      `${task.label} ${icons[task.label]}`,
      ["task-card-label", labelClasses[task.label]],
      null,
      article,
      true
    );

    createElement("h3", task.title, ["task-card-title"], null, article);

    createElement(
      "p",
      task.description,
      ["task-card-description"],
      null,
      article
    );

    createElement(
      "div",
      `Estimated at ${task.points} pts`,
      ["task-card-points"],
      null,
      article
    );

    createElement(
      "div",
      `Assigned to: ${task.assignee}`,
      ["task-card-assignee"],
      null,
      article
    );

     createElement(
      "div",
      null,
      ["task-card-actions"],
      null,
      article
    );

    const deleteButton = createElement("button", "Delete", null, null, deleteButton);
    deleteButton.addEventListener("click", deleteButton);
    
    const totalPoints = Object.values(tasks).reduce(
      (acc, curr) => acc + curr.points,
      0
    );
    selectors.totalPoints.textContent = `Total points ${totalPoints}pts`;
    
    Object.values(inpSelectors).forEach(e => e.value = "")
    tasks[task.id] = task;
  }
  function deleteButton(e) {

  }

  function createElement(type, textContent, classes, id, parent, useInnerHTML) {
    const element = document.createElement(type);

    if (useInnerHTML && textContent) {
      element.innerHTML = textContent;
    } else if (textContent) {
      element.textContent = textContent;
    }

    if (classes && classes.length > 0) {
      element.classList.add(...classes);
    }

    if (id) {
      element.setAttribute("id", id);
    }

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  }
}
