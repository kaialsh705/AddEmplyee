import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux';

const Index = (props) => {
    console.log("employee_data", props.employee_data)
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("EmployeeList")}
            >
                <Text style={styles.buttonText}>Add Employee</Text>
            </TouchableOpacity>
        </View>
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
