import { _converse, converse } from "../../core.js";
import log from "../../log";

const { Strophe } = converse.env;


export async function createChatBox (jid, attrs, Model) {
    jid = Strophe.getBareJidFromJid(jid.toLowerCase());
    Object.assign(attrs, {'jid': jid, 'id': jid});
    let chatbox;
    try {        
        chatbox = new Model(attrs, {'collection': _converse.chatboxes});
    } catch (e) {
        log.error(e);
        return null;
    }
    await chatbox.initialized;
    if (!chatbox.isValid()) {
        chatbox.destroy();
        return null;
    }

    //Seteamos Cuantos Chat vamos a permitir que se abran
    let chatsPermitidosAbiertos = 2;

    if(_converse.chatboxes.length > chatsPermitidosAbiertos ){

        //Almacenamos los chats que en el orden que queremos mostrar
        let auxArr = [chatbox,_converse.chatboxes.models[2]];

        //Cerramos todos los chat 
        //Se trabaja con FOR, ya que al cerrar el chat el lenght de la coleccion cambia
        //Siempre seteamos el indice 1 por que es el que siempre va quedando para cerrar
        for (let index = 0; index < chatsPermitidosAbiertos; index++) {
            let JID = _converse.chatboxes.models[1].attributes.jid;
            let deleteChatModel = _converse.chatboxes.get(JID);
            deleteChatModel.close();            
        }

        //Cargamos los chats que queremos mostrar
        for (let i = 0; i < auxArr.length; i++) {
            _converse.chatboxes.add(auxArr[i]);
        }
        
    }
    else{
        _converse.chatboxes.add(chatbox);
    }    
    
    return chatbox;
}
