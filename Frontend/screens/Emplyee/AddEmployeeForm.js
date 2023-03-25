import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    ScrollView,
} from "react-native";
import axios from "axios";
import Loader from "./Loader";
import * as yup from 'yup';
import {Formik} from 'formik';
import {host_port} from '../../env'
import {connect} from "react-redux";


const AddEmployeeForm = (props) => {
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        getCsrfToken();
    }, []);

    const getCsrfToken = async () => {
        setIsLoad(true);
        try {
            const response = await fetch(host_port + "csrf_token", {
                method: "GET",
                headers: {
                    "X-CSRFToken": "not-a-token",
                },
            });
            const data = await response.json();
            setToken(data.csrftoken);
            setIsLoad(false);
        } catch (error) {
            setIsLoad(false);
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (value) => {
        setIsLoad(true);
        const data = {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email_id,
            job_title: value.job_title,
            salary: value.salary
        }
        axios
            .post(host_port + "employee/", data, {
                headers: {
                    "X-CSRFToken": token,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const responseData = response.data;
                setMessage(responseData.message);
                if (responseData.success) {
                    props.route.params?.getEmployee ? props.route.params.getEmployee() : null
                    props.navigation.goBack()
                }
            });
    };

    return (
        <ScrollView style={styles.container}>
            {message ? (
                <View style={styles.message}>
                    <Text>{message}</Text>
                </View>
            ) : null}
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    job_title: '',
                    salary: '',
                    email_id: '',
                }}
                validationSchema={() =>
                    yup.lazy(values => {
                        let validation_dict = {};
                        validation_dict.first_name = yup
                            .string()
                            .label('FIRST NAME')
                            .required('Enter The First Name');
                        validation_dict.last_name = yup
                            .string()
                            .label('LAST NAME')
                            .required('Enter The Last Name');
                        validation_dict.job_title = yup
                            .string()
                            .label('JOB TITLE')
                            .required('Enter The Job Title');
                        validation_dict.salary = yup
                            .string()
                            .label('SALARY')
                            .required('Enter The salary');
                        validation_dict.email_id = yup
                            .string()
                            .label('EMAIL')
                            .email('Invalid email address')
                            .required('Enter the email address')
                            .test(
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                function () {
                                    return 'Invalid email address';
                                },
                            );
                        return yup.object().shape(validation_dict);
                    })
                }
                onSubmit={values => handleSubmit(values)}>
                {props => (
                    <React.Fragment>
                        <Text style={styles.label}>First Name *</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.first_name}
                            onChangeText={props.handleChange('first_name')}
                            placeholder="First Name"
                        />
                        {props.touched.first_name && (
                            <Text style={styles.error_msg}>
                                {props.errors.first_name}
                            </Text>
                        )}
                        <Text style={styles.label}>Last Name *</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.last_name}
                            onChangeText={props.handleChange('last_name')}
                            placeholder="Last Name"
                        />
                        {props.touched.last_name && (
                            <Text style={styles.error_msg}>
                                {props.errors.last_name}
                            </Text>
                        )}
                        <Text style={styles.label}>Email *</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.email_id}
                            onChangeText={props.handleChange('email_id')}
                            placeholder="Email"
                            multiline={true}
                        />
                        {props.touched.email_id && (
                            <Text style={styles.error_msg}>
                                {props.errors.email_id}
                            </Text>
                        )}
                        <Text style={styles.label}>Job Title *</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.job_title}
                            onChangeText={props.handleChange('job_title')}
                            placeholder="Job Title"
                        />
                        {props.touched.job_title && (
                            <Text style={styles.error_msg}>
                                {props.errors.job_title}
                            </Text>
                        )}
                        <Text style={styles.label}>Salary *</Text>
                        <TextInput
                            style={styles.input}
                            value={props.values.salary}
                            onChangeText={props.handleChange('salary')}
                            placeholder="Salary"
                            keyboardType={'numeric'}
                        />
                        {props.touched.salary && (
                            <Text style={styles.error_msg}>
                                {props.errors.salary}
                            </Text>
                        )}
                        <Button onPress={props.handleSubmit} title="Submit"/>
                    </React.Fragment>
                )}
            </Formik>
            {isLoad ? (
                <View style={{marginTop: "80%"}}>
                    <Loader/>
                </View>
            ) : null}

        </ScrollView>
    );
};
const mapStateToProps = state => {
    return {
        employee_data: state.reducer.employee_data,
    };
};

export default connect(mapStateToProps)(AddEmployeeForm);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        minHeight: 40,
    },
    message: {
        backgroundColor: "lightgreen",
        color: "green",
        alignItems: "center",
        padding: 8,
    },
    error_msg: {
        fontSize: 10,
        color: 'red',
    },
});
