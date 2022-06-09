import DepartmentHttpService from "../services/departmentservice";
import { takeLatest, call, put, all } from "redux-saga/effects";

function getDepartments() {
    let serv = new DepartmentHttpService();
    const response = serv.getData().then((result) => result.data);

    return Promise.resolve(response);
}

function postDepartment(dept) {
    let serv = new DepartmentHttpService();
    let response = serv.postData().then((result) => result.data);
    return Promise.resolve(response);
}

// define input and output saga generators

function* outputActionGetDepartments() {
    console.log("Monitoring The Saga for Get Departments Success");
    try {
        const response = yield call(getDepartments);
        console.log(`Received response $in Output Generator ${JSON.stringify(response.data)}`);

        // dispatch the output action
        yield put({
            type: "GET_DEPARTMENT_SUCCESS", //output action type
            department: response.data,
            message: 'Successfully Received Departments'
        });
    } catch (e) {
        yield put({
            type: "GET_DEPARTMENTS_FAILED", // output action type
            message: `Failed to read departments ${e.message}`, // payload
        });
    }
}

function* inputActionGetDepartments() {
    console.log("Monitoring The Saga for Get Departments");
    yield takeLatest("GET_DEPARTMENTS", outputActionGetDepartments);
}

function* outputActionPostDepartment(action) {
    console.log("Monitoring The Saga for Post Department Success");
    // read the payload of the input dispatched action
    const dept = action.department;
    console.log(`Received data fro Post is = ${JSON.stringify(dept)}`);
    try {
        // call the method
        const response = yield call(postDepartment, dept);
        console.log(`Response after POST is = ${JSON.stringify(response)}`);
        yield put({
            type: "ADD_DEPARTMENT_SUCCESS",
            department: response.data,
            message: 'New Department is Added Successfully'
        });
    } catch (e) {
        yield put({
            type: "ADD_DEPARTMENT_FAILED",
            department: `Add  new department is failed ${e.message}`,
        });
    }
}

function* inputActionPostDepartment() {
    console.log("Monitoring The Saga for Post Department");
    // the takeLatest when listen to the dispatched action
    // it read is payload and this payload is used for Processing the data
    yield takeLatest("ADD_DEPARTMENT", outputActionPostDepartment);
}

export default function* rootSaga() {
    console.log(`Root SAGA is Executing and will monitor all dispatched actions`);
    yield all([inputActionPostDepartment(), inputActionGetDepartments()]);
}