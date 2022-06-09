export const getDepartments=()=>{
    return {
        type: 'GET_DEPARTMENTS'
    };
};

export const addDepartment=(department)=>{
    return {
        type: 'ADD_DEPARTMENT', 
        department  // the payload the data to be posted
    };
};