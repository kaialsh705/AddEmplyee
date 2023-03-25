import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image
} from "react-native";
import UserAvatar from 'react-native-user-avatar';
import {host_port} from '../../env'
import {store} from '../../index'
import {EMPLOYEE_DATA, IS_SAVED} from '../../Store/actions/actionTypes'
import Loader from "./Loader";
import axios from "axios";
import {FloatingAction} from "react-native-floating-action";
import {connect} from "react-redux";

const Employee = ({item, is_saved_employee}) => {
    let full_name = item.first_name + ' ' + item.last_name
    return (
        <View style={styles.empItem}>
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
                <TouchableOpacity onPress={() => is_saved_employee(item.email, item.is_saved ? 0 : 1)}
                                  style={{position: 'absolute', right: 10, top: 10}}>
                    <Image resizeMode="cover"
                           source={item.is_saved ? require('../../static/star_bookmarkd.png') : require('../../static/star.png')}
                           style={{height: 30, width: 30}}
                    />
                </TouchableOpacity>
            </View>
        </View>
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
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(false);
    const [isLock, setIsLock] = useState(false);
    const [extraData, setExtraData] = useState(false);

    useEffect(() => {
        getEmployee();
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

    const is_saved_employee = async (email, type) => {
        if (!isLock) {
            setIsLock(true)
            const data = {
                email: email,
                is_save_type: type
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
                    setIsLock(false)
                    props.employee_data?.filter((item => {
                        return item.email === email
                    })).map(item => {
                        item.is_saved = responseData.is_saved
                    })
                    setExtraData(!extraData)
                    store.dispatch({
                        type: EMPLOYEE_DATA,
                        payload: {
                            employee_data: props.employee_data
                        }
                    })
                    store.dispatch({
                        type: IS_SAVED,
                        payload: {
                            is_saved: responseData.emp_saved_count
                        }
                    })
                });
        }
    }

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
        <View style={styles.container}>
            {isLoading ? (
                <Loader/>
            ) : (
                <FlatList
                    data={props.employee_data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Employee is_saved_employee={is_saved_employee} item={item}/>}
                    style={styles.empList}
                    extraData={extraData}
                />
            )}
            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    if (name === 'bt_accessibility') {
                        props.navigation.navigate("AddEmployeeForm", {getEmployee: getEmployee})
                    }
                }}
            />
        </View>
    );
};
const mapStateToProps = state => {
    return {
        employee_data: state.reducer.employee_data,
    };
};
export default connect(mapStateToProps)(EmployeeList);

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
        marginLeft: 12,
        marginTop: 5
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

