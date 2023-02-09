//React Native FlatList Pagination to Load More Data dynamically – Infinite List
//https://aboutreact.com/react-native-flatlist-pagination-to-load-more-data-dynamically-infinite-list/

//import React in our code
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';

//import all the components we are going to use
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreed } from '../../redux/slices/breedSlice';

const initialPageConfig = {
    page: 0,
    limit: 5
}

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { breedList, status } = useSelector((state) => state.breeds)
    const [payload, setPayload] = useState(initialPageConfig)

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        dispatch(fetchBreed(payload)).then(unwrapResult).then((res) => {
            if (res.status == 200) {
                setPayload({ ...payload, page: payload.page + 1 })
            }

        })
    }

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getData}
                    style={styles.loadMoreBtn}>
                    {status == 'loading' ?
                        <ActivityIndicator
                            color="white"
                            style={{ marginLeft: 8 }} /> :
                        <Text style={styles.btnText}>Load More</Text>}
                </TouchableOpacity>
            </View>
        );
    };

    const ItemView = ({ item }) => {
        return (
            <View style={styles.item}>
                <View style={{ padding: 10, backgroundColor: '#909090' }}>
                    <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>

            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {breedList.length == 0 ?
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={'#000'} />
                    </View>
                </>
                :
                <FlatList
                    data={breedList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    ListFooterComponent={renderFooter}
                />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        marginHorizontal: 8,
        padding: 10,
        flex: 1,
        // width: '100%',
        backgroundColor: '#000',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    description: {
        padding: 10,
        fontSize: 16,
        color: '#000',
    },
});

export default HomeScreen;