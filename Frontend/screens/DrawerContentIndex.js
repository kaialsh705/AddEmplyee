import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {connect} from "react-redux";

const DrawerContentIndex = props => {
    return (
        <DrawerContentScrollView  {...props}>
            <View>
                <View style={styles.btn_container}>
                    <View>
                        <Text
                            style={styles.font_color_and_family}>
                            {' '}
                            Total Bookmarked ()
                        </Text>
                    </View>
                </View>
                <View style={styles.btn_container}>
                    <View>
                        <Text
                            style={styles.font_color_and_family}>
                            {' '}
                            Total Employee ()
                        </Text>
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};
const styles = StyleSheet.create({
    hr_line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    btn_container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    side_image: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginBottom: 5,
        marginLeft: 10,
    },
    font_color_and_family: {
        color: '#000',
        fontSize: 20
    },
});
const mapStateToProps = state => {
    return {
        employee_data: state.reducer.employee_data,
        is_saved: state.reducer.is_saved,
    };
};

export default connect(mapStateToProps)(DrawerContentIndex);
