/**
 * Created by lukedowell on 7/30/15.
 */
$(document).ready(function() {
    $("#projectGenBtn").on('click', function() {
        //Create a project with our inputted name and a random company name
        var projectName = $("#projectNameField").val();
        var companyName = COMPANY_NAMES[getRandomNum(0, COMPANY_NAMES.length-1)];
        active_project = new ClientProject(projectName, companyName);
        current_employee = [];
        $('.project-container').html(buildProjectElements(active_project));
    });

    //Button - Get Staff - Ajax
    $("body").on('click', '#getStaffBtn', function() {
        var employeeList = {list: "FrontEnd,ClientSide,ServerSide"};
        $.ajax({
            type: "POST",
            url: "/employee-request",
            contentType: "application/JSON",
            dataType: "json",
            data: JSON.stringify(employeeList),
            success: function(response) {
                var employees = response;
                for(var i = 0; i < employees.length; i++) {
                    var emp = employees[i];
                    current_employees.push(emp);
                    $(".employee-container").append(buildEmployeeCard(emp));
                }

                var $sprintReq = $("<h2/>", {text: "Sprints Needed: " + calculateSprintsRequired()});
                $(".project-info-container").append($sprintReq);

            }
        });


        $(this).hide();
        $(this).parent().append($("#employeeRequestBtn").fadeIn(1000));

    });
});

//Constants
var COMPANY_NAMES = ["Prime Steakhouse", "Prime Emporium", "Prime Laundromat", "Prime Slosh 'n Wash", "Prime Real Estate", "Prime Ice Cream Shoppe"];

//Not constants
var active_project = undefined;
var current_employees = [];

/**
 * Creates a new client project and randomly assigns
 * it's project requirements to itself
 * @constructor
 */
function ClientProject(name, companyName) {
    this.name = name;
    this.companyName = companyName;

    this.frontReq = getRandomNum(10, 60);
    this.clientReq = getRandomNum(10, 60);
    this.serverReq = getRandomNum(10, 60);
    console.log("Project created! ");
}

/**
 * Calculate our minimum sprints required to complete the project
 */
function calculateSprintsRequired() {
    var feUnits = 0;
    var csUnits = 0;
    var ssUnits = 0;

    for(var i = 0; i < current_employees.length; i++) {
        console.log(current_employees[i].skill);
        switch(current_employees[i].skill) {
            case "FrontEnd":
                feUnits += current_employees[i].units;
                break;
            case "ServerSide":
                ssUnits += current_employees[i].units;
                break;
            case "ClientSide":
                csUnits += current_employees[i].units;
                break;
        }
    }

    var feSprints = Math.ceil(active_project.frontReq / feUnits);
    var csSprints = Math.ceil(active_project.clientReq / csUnits);
    var ssSprints = Math.ceil(active_project.serverReq / ssUnits);
    console.log("FE: " + feUnits + " / " + feSprints + " \n" +
                "CS: " + csUnits + " / " + csSprints + " \n" +
                "SS: " + ssUnits + " / " + ssSprints + " \n"
    );
    return Math.max(feSprints, csSprints, ssSprints);
}

/**
 * Creates an employee card
 * @param employee
 * @returns {*|jQuery|HTMLElement}
 */
function buildEmployeeCard(employee) {
    console.log(employee);
    var $empCard = $("<div/>", {
        class: "employee-card"
    });

    $empCard.append($("<h4/>", {text: employee.skill}));
    $empCard.append($("<p/>", {text: employee.name}));
    $empCard.append($("<p/>", {text: employee.units + " units per sprint"}));

    return $empCard;
}

/**
 * Builds a project
 * @param clientProject
 * @returns {*|jQuery|HTMLElement}
 */
function buildProjectElements(clientProject) {
    //Divs
    var $projectDiv = $('<div/>', {class: "project-wrapper panel panel-primary"});
    var $panelHead = $("<div/>", {class: "panel-heading"});
    var $panelTitle = $("<h2/>", {text: clientProject.name + " -- " + clientProject.companyName});
    var $panelBody = $("<div/>", {class: "panel-body"});
    var $buttonRow = $("<div/>", {class: "row button-row"});
    var $getStaffBtn = $("<button/>", {id: "getStaffBtn", class:"btn btn-primary", type:"button", text: "Get Staff!"});
    var $infoRow = $("<div/>", {class: "row info-row"});
    var $employeeContainer = $("<div/>", {class:"well employee-container col-md-6 col-md-offset-1"});
    var $projectInfoContainer = $("<div/>", {class:"well project-info-container col-md-3 col-md-offset-1"});
    var $projectInfoHeader = $("<div/>", {class: "info-header text-center"});

    //Info Content
    var $infoTitle = $("<h3/>", {text: "Project Info"});
    var $feReqTitle = $("<h4/>", {text: "Front End Requirements"});
    var $feReqVal = $("<p/>", {text: clientProject.frontReq});
    var $csReqTitle = $("<h4/>", {text: "Client Side Requirements"});
    var $csReqVal = $("<p/>", {text: clientProject.clientReq});
    var $ssReqTitle = $("<h4/>", {text: "Server Side Requirements"});
    var $ssReqVal = $("<p/>", {text: clientProject.serverReq});

    //Stack
    $panelHead.append($panelTitle);
    $panelBody.append($buttonRow);
    $panelBody.append($infoRow);

    $buttonRow.append($getStaffBtn);

    $infoRow.append($employeeContainer);
    $infoRow.append($projectInfoContainer);

    $projectInfoContainer.append($projectInfoHeader);
    $projectInfoHeader.append($infoTitle);
    $projectInfoContainer.append($feReqTitle);
    $projectInfoContainer.append($feReqVal);
    $projectInfoContainer.append($csReqTitle);
    $projectInfoContainer.append($csReqVal);
    $projectInfoContainer.append($ssReqTitle);
    $projectInfoContainer.append($ssReqVal);

    $projectDiv.append($panelHead);
    $projectDiv.append($panelBody);
    return $projectDiv;
}

/**
 * Gets a random number
 * @param min
 * @param max
 */
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}