import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import UserAvatar from 'react-native-user-avatar';
import {host_port} from '../../env'
import {store} from '../../index'
import {EMPLOYEE_DATA} from '../../Store/actions/actionTypes'
import Loader from "./Loader";
import axios from "axios";
import {FloatingAction} from "react-native-floating-action";

const Employee = ({item}) => {
    let full_name = item.first_name + ' ' + item.last_name
    return (
        <TouchableOpacity style={styles.empItem}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <UserAvatar size={50} name={full_name}/>
                </View>
                <View style={{marginLeft: 10}}>
                    <Text
                        style={[styles.empTitle, {fontWeight: 'bold'}]}>Full
                        Name: {item.first_name + ' ' + item.last_name}</Text>
                    <Text style={styles.empTitle}>Email: {item.email}</Text>
                    <Text style={styles.empTitle}>Job Title: {item.job_title}</Text>
                    <Text style={styles.empTitle}>Salary: {item.salary}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const actions = [
    {
        text: "Add Employee",
        icon: require("../../static/accessibility-og.jpeg"),
        name: "bt_accessibility",
        position: 2
    },
];
const EmployeeList = (props) => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(false);

    useEffect(() => {
        getBlogs();
        getCsrfToken();
    }, []);

    const getCsrfToken = async () => {
        try {
            const response = await fetch(host_port + "csrf_token", {
                method: "GET",
                headers: {
                    "X-CSRFToken": "not-a-token",
                },
            });
            const data = await response.json();
            setToken(data.csrftoken);
        } catch (error) {
        }
    };

    const is_saved_employee = async () => {
        const data = {
            first_name: value.first_name,
        }
        axios
            .post(host_port + "is_saved_employee/", data, {
                headers: {
                    "X-CSRFToken": token,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const responseData = response.data;
                console.log('responseData', responseData)
                ////     store.dispatch({
                //         //         type: EMPLOYEE_DATA,
                //         //         payload: {
                //         //             employee_data: data
                //         //         }
                //         //     })
                // setMessage(responseData.message);
                // if (responseData.success) {
                //     // props.route.params?.getBlogs ? props.route.params.getBlogs() : null
                // }
            });
    }

    const getBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(host_port + "get_data/", {
                method: "GET",
            });
            const data = await response.json(); // Parse response body as JSON
            setEmployees(data.data); // variable called 'blogs' to store the fetched data
            if (data) {
                store.dispatch({
                    type: EMPLOYEE_DATA,
                    payload: {
                        employee_data: data
                    }
                })
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Loader/>
            ) : (
                <FlatList
                    data={employees}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Employee item={item}/>}
                    style={styles.empList}
                />
            )}
            {/*<TouchableOpacity*/}
            {/*    style={styles.floatingButton}*/}
            {/*    onPress={() => navigation.navigate("CreateBlog", {getBlogs: getBlogs})}*/}
            {/*>*/}
            {/*    /!*<AntDesign name="plus" size={32} color="#fff"/>*!/*/}
            {/*</TouchableOpacity>*/}
            <FloatingAction
                // actions={actions}
                onPressMain={() => props.navigation.navigate("AddEmployeeForm")}
                // onPressItem={name => {
                //     if (name === 'Add Employee') {
                //
                //     }
                // }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
    },
    scrollContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    },
    empList: {
        marginTop: 12,
        width: "100%",
    },
    empItem: {
        width: 95 + '%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },
    empTitle: {
        fontSize: 16,
        flexWrap: "wrap",

    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "blue",
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default EmployeeList;
