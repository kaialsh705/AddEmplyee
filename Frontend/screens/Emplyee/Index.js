import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux';
import EmployeeList from "./EmployeeList";
import {host_port} from "../../env";
import {store} from "../../index";
import {EMPLOYEE_DATA, IS_SAVED} from "../../Store/actions/actionTypes";
import Loader from "./Loader";

const Index = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getEmployee();
    }, []);
    const getEmployee = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(host_port + "get_data/", {
                method: "GET",
            });
            const data = await response.json();
            if (data?.data) {
                store.dispatch({
                    type: EMPLOYEE_DATA,
                    payload: {
                        employee_data: data.data
                    }
                })
                store.dispatch({
                    type: IS_SAVED,
                    payload: {
                        is_saved: data.emp_count
                    }
                })
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <React.Fragment>
            {isLoading ? (
                <Loader/>
            ) : null}
            {!isLoading && !props.employee_data?.length ? (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate("AddEmployeeForm", {getEmployee: getEmployee})}
                    >
                        <Text style={styles.buttonText}>Add Employee</Text>
                    </TouchableOpacity>
                </View>
            ) : !isLoading ? <EmployeeList navigation={props.navigation}/> : null}
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        employee_data: state.reducer.employee_data,
    };
};

export default connect(mapStateToProps)(Index);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#4287f5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
