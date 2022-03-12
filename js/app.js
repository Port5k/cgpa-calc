/* MODAL OBJECT CARRYING DYNAMIC DATA */

let modalObject = {
    schematicsModal: {
        content: `<div class="modal schematics_modal">
        <div class="modal_close">Close</div>
        <p class="schematics_modal_title">Schematics: How to Calculate CGPA</p>
        <div class="schematics">
           <p>
                CGPA is calculated by dividing the sum of the grade points earned by the total unit value of courses
                you have attempted. Total point per course is calculated using <em>grade value</em> multiplied by the
                number of units the course carries.The grade value is given below:<br>
            </p>
            <ul class="grade_value_list">
                <li>A = 70 - 100(5 Points)</li>
                <li>B = 60 - 69(4 Points)</li>
                <li>C = 50 - 59(3 Points)</li>
                <li>D = 40 - 49(2 Points)</li>
                <li>E = 35 - 39(1 Points)</li>
                <li>F = 34 - 0(0 Points)</li>
            </ul>
            <p>
                From the above grading system, if a certain Student X has a B in CS50 and CS50 is a 3 unit course, then
                Student B's grade point in CS50 is <var>3 * 4 = 12 points</var>.So, lets say this same Student B is
                offering 10 courses each having 3 units , then his CGPA is calculated using <br><var>
                    CGPA = Cumulative Grade Point In all Courses/Total Unit Value In All Offered Courses.<br>
                    CGPA = (10 courses) * (12 points each)/ (10 courses) * (3 Units per course). <br>
                    CGPA = (120 Grade Points)/(30 Total Unit Value). <br>
                    CGPA = 4.O
                </var>
            </p>
        </div>
    </div>`,
        optionalClass: `overlay_div_show`
    },
    userOnboardingModal: {
        content: `<div class="modal user_onboarding_modal">
                    <div class="form user_onboarding_modal_form">
                        <p class="modal_form_text">Please fill in the following spaces</p>
                        <div class="modal_form_item">
                            <label for="userName">Name:</label>
                            <input type="text" name="userName" id="userName" placeholder="John Doe">
                        </div>
                        <div class="modal_form_item">
                            <label for="currentDepartment">Current Department</label>
                            <input type="text" name="currentDepartment" id="currentDepartment" placeholder="Accounting">
                        </div>
                        <div class="modal_form_item">
                            <label for="currentYear">Current School Year</label>
                            <input type="number" name="currentYear" id="currentYear" min="1" step="1" max="7" placeholder="1-7 (1 for 100 Level, e.t.c)">
                        </div>
                        <div class="modal_close form_modal_button_wrapper">
                            <button class="form_modal_button">OK</button>
                        </div>
                    </div>
                </div>`,
        optionalClass: `overlay_div_show`
    }
};

/* ALERTS */

// ERROR ALERT
let errorAlertBuilder = (errorInfo, parentNode, referenceInsertionNode) => {
    //Build Alert
    let inputFormErrorWrapper = document.createElement("div");
    inputFormErrorWrapper.setAttribute("class", "error_class");
    inputFormErrorWrapper.textContent = errorInfo;

    //Insert Alert into Document
    parentNode.insertBefore(inputFormErrorWrapper, referenceInsertionNode);

    //Remove Alert fron Document
    setTimeout(() => {
        inputFormErrorWrapper.remove()
    }, 1000);
}

/*MODALS*/

let overlayDiv = document.querySelector('.overlay_div');

let displayModal = (modalType, optionalClass) => {
    overlayDiv.innerHTML = modalType;
    overlayDiv.classList.add(optionalClass);
}

let closeModal = (optionalClass) => {
    let modalCloseButton = document.querySelector(".modal_close");
    modalCloseButton.addEventListener("click", () => {
        removeModal(optionalClass);
    });
}

let removeModal = (optionalClass) => {
    let modal = document.querySelector('.modal');
    modal.remove();
    overlayDiv.classList.remove(optionalClass);
}

//SCHEMATICS  MODAL
let schematicsModalType = modalObject.schematicsModal.content;
let schematicsModalOptionalClass = modalObject.schematicsModal.optionalClass;
let schematicsModalTrigger = document.querySelector('.header_utility_modal_trigger');

//Loads modal on click of header utility button
schematicsModalTrigger.addEventListener("click", () => {
    displayModal(schematicsModalType, schematicsModalOptionalClass);

    //Close modal with modal close button
    closeModal(schematicsModalOptionalClass);

});

//USER ONBOARDING MODAL
let userOnboardingModalType = modalObject.userOnboardingModal.content;
let userOnboardingModalOptionalClass = modalObject.userOnboardingModal.optionalClass;

//Build Modal Form
window.addEventListener("load", displayModal(userOnboardingModalType, userOnboardingModalOptionalClass));

//User Onboarding Data Input
let userOnboardingModalForm = document.querySelector(".user_onboarding_modal_form");
let errorModal = modalObject.errorModal;
let modalFormText = document.querySelector(".modal_form_text")
let userName = document.querySelector("#userName");
let userNameField = document.querySelector(".username");
let currentYear = document.querySelector("#currentYear");
let currentYearField = document.querySelector(".current_year");
let currentDepartment = document.querySelector("#currentDepartment");
let currentDepartmentField = document.querySelector(".current_department");
let userOnboardingModalFormButton = document.querySelector(".form_modal_button");

let renderUserOnboardingData = () => {
    if ((userName.value == "") || ((currentYear.value == "") || (currentYear.value > 7) || (currentYear.value < 0)) || (currentDepartment.value == "")) {
        let userOnboardingModalFormButtonWrapper = document.querySelector(".form_modal_button_wrapper");
        errorAlertBuilder("Please Fill In All Fields", userOnboardingModalForm, userOnboardingModalFormButtonWrapper);
    } else {
        //render user onboarding data
        userNameField.textContent = userName.value;
        currentYearField.textContent = currentYear.value;
        currentDepartmentField.textContent = currentDepartment.value;

        //close modal
        closeModal(userOnboardingModalOptionalClass);
    }
}

userOnboardingModalFormButton.addEventListener("click", () => {
    renderUserOnboardingData();
})

/* COLOR THEME */

let themeTogglerWrapper = document.querySelector('.toggler_wrapper');

let addDarkMode = () => {
    //Move Visual Indicator
    themeTogglerWrapper.classList.add("end");
    document.body.classList.add("dark_mode")
}

let addLightMode = () => {
    //Move Visual Indicator
    themeTogglerWrapper.classList.remove("end");
    document.body.classList.remove("dark_mode")
}

// Change theme according to current time 

let time = new Date().getHours();

if ((time <= 6) || (time >= 19))
    addDarkMode();
else
    addLightMode();

//Change theme according user preferences 

themeTogglerWrapper.addEventListener("click", () => {
    if (themeTogglerWrapper.classList.contains("end"))
        addLightMode();
    else
        addDarkMode();
});


/* INPUT SECTION */

let courseCodeInput = document.querySelector(".course_code_input");
let numberOfUnitInput = document.querySelector(".number_of_unit_input");
let scoreInput = document.querySelector(".score_input")
let pendingTable = document.querySelector(".table_pending");

//ARRAYS COLLECTING USER DATA
let numberOfUnitInputArray = [];
let scoreInputArray = [];

let dataArrayBuilder = (array, data) => {
    //Build Arrays From Data Inputed into Tables
    array.push(data);
}

let dataArrayPopper = (e, array1, array2) => {
    //Remove Data Specific to  a Particular Row From Array When The Row is Deleted
    let rowIndex = e.target.parentElement.parentElement.rowIndex;
    if (rowIndex == 1) {
        array1.shift();
        array2.shift();
    } else if ((rowIndex == (array1.length))) {
        array1.pop();
        array2.pop();
    } else {
        array1.splice(rowIndex - 1, 1);
        array2.splice(rowIndex - 1, 1);
    }
}

//Table Row Builder
let rowBuilder = () => {
    //Build new row 
    let newRow = document.createElement("tr");
    newRow.setAttribute("class", "new_row")

    //Build data cell template
    let dataCellTemplate = `<td class="course_code">${courseCodeInput.value}</td>
                            <td class="number_of_units">${Number(numberOfUnitInput.value)}</td>
                            <td class="score">${Number(scoreInput.value)}</td>
                            <td class="row_remove_wrapper">
                                <button class="row_remove_button">X</button>
                            </td>`;

    //Insert data cell template into row
    newRow.innerHTML = dataCellTemplate;

    //Insert row into table
    pendingTable.appendChild(newRow);

    //Push data into arrays
    dataArrayBuilder(numberOfUnitInputArray, Number(numberOfUnitInput.value));
    dataArrayBuilder(scoreInputArray, Number(scoreInput.value));

    //Clear All Fields
    courseCodeInput.value = "";
    numberOfUnitInput.value = "";
    scoreInput.value = "";

}

//Add Course into pendingTable
let inputForm = document.querySelector(".input_form");
let inputFormButtonWrapper = document.querySelector(".input_form_button_wrapper");
let addCourseButton = document.querySelector(".add_course");
let cgpaCalculateButton = document.querySelector(".cgpa_calculate_button");
let tableResetButton = document.querySelector(".table_reset_button");

addCourseButton.addEventListener("click", (e) => {
    //Prevent button's default action 
    e.preventDefault();
    //Build complete data row
    if (courseCodeInput.value == "" || numberOfUnitInput.value == "" || scoreInput == "") {
        errorAlertBuilder("Please Fill In All Fields !", inputForm, inputFormButtonWrapper);
    } else {
        removeButtonState(cgpaCalculateButton, "disabled");
        removeButtonState(tableResetButton, "disabled");
        rowBuilder();
    }
})



/* TABLE FUNCTIONALITIES */

//DELETE ROW 
let tableRowDeleteButton = document.querySelector(".row_remove_button");
pendingTable.addEventListener("click", (e) => {
    deleteRow(e);
})

let deleteRow = (e) => {
    dataArrayPopper(e, numberOfUnitInputArray, scoreInputArray);
    if (e.target.classList.contains("row_remove_button"))
        e.target.parentElement.parentElement.remove();
}

let removeButtonState = (button, attribute) => {
    button.removeAttribute(attribute);
}


// CALCULATE CGPA

let gradePointArray = [];

function gradePointCalc(array1, array2) {
    for (let x = 0; x < array1.length; x++) {
        if (array1[x] >= 70) {
            let gradePoint = 5 * array2[x];
            dataArrayBuilder(gradePointArray, gradePoint);
        } else if (array1[x] < 70 && array1[x] >= 60) {
            gradePoint = 4 * array2[x];
            dataArrayBuilder(gradePointArray, gradePoint);
        } else if (array1[x] < 60 && array1[x] >= 50) {
            gradePoint = 3 * array2[x];
            dataArrayBuilder(gradePointArray, gradePoint);
        } else if (array1[x] < 50 && array1[x] >= 40) {
            gradePoint = 2 * array2[x];
            dataArrayBuilder(gradePointArray, gradePoint);
        } else if (array1[x] < 40 && array1[x] >= 35) {
            gradePoint = 1 * array2[x];
            dataArrayBuilder(gradePointArray, gradePoint);
        } else {
            gradePoint = 0 * array2[x];
            dataArrayBuilder(gradePointArray, gradePoint);
        }
    }

    return gradePointArray;
}

let cgpaCalculate = () => {
    gradePointCalc(scoreInputArray, numberOfUnitInputArray);

    //Cumulative Grade Point (CGP)
    let CGP = gradePointArray.reduce((a, b) => a + b);

    //Total Unit Value(TNU)
    let TNU = numberOfUnitInputArray.reduce((a, b) => a + b);

    //CGPA
    let CGPA = (CGP / TNU).toFixed(2);

    //Clear Array
    gradePointArray = [];


    //Insert Result Modal into document

    let resultModalTemplate = `<div class="result_modal_wrapper">
                                    <div class="result_modal">
                                        <p>${CGPA}</p>
                                        <button class="result_modal_button" value="OK">OK</button>
                                    </div>
                                </div>`;
    document.querySelector(".xar_modal").innerHTML = resultModalTemplate;
    document.querySelector(".xar_modal").classList.add("modal_show");
    document.querySelector(".result_modal_button").addEventListener("click", () => {
        document.querySelector(".result_modal_wrapper").remove();
        document.querySelector(".xar_modal").classList.remove("modal_show");
    })

}

cgpaCalculateButton.addEventListener("click", () => {
    cgpaCalculate();
})


//TABLE RESET

let clearTable = () => {
    let tableRows = document.querySelectorAll("tr");
    tableRows.forEach(row => {
        if (row.classList.contains("new_row"))
            row.remove();
    });
    clearArray(gradePointArray);
    clearArray(scoreInputArray);
    clearArray(numberOfUnitInputArray);
}

let clearArray = (array) => {
    for (let x = 0; x < array.length; x++) {
        array.pop();
    }
}

tableResetButton.addEventListener("click", () => {
    clearTable();
})



/* PORT5K */