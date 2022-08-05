import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'

//inital state
const initialState = {
   notes: [{"id":1,"title":"sed magna at nunc ","content":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."},
    {"id":2,"title":"erat eros viverra eget congue eget semper rutrum ","content":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."},
    {"id":3,"title":"ornare consequat lectus est risus ","content":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."},
    {"id":4,"title":"duis at velit eu est congue","content":"Phasellus in felis. Donec semper sapien a libero. Nam dui."},
    {"id":5,"title":"risus semper porta volutpat quam","content":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."},
    {"id":6,"title":"aenean lectus pellentesque eget nunc","content":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."},
    {"id":7,"title":" libero rutrum ac lobortis vel dapibus at","content":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."},
    {"id":8,"title":" hac habitasse platea","content":"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."},
    
    ]
}


// create context

export const GlobalContext = createContext(initialState);

// global provider 

export function GlobalProvider({children}) {

    const [state, dispatch] = useReducer(AppReducer,initialState);

    //actions

    function deleteNote(id) {
        dispatch({
            type: 'DELETE_NOTE',
            payload: id
         } )
    }

    return(
        <GlobalContext.Provider value ={{
            notes : state.notes,
            deleteNote
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
