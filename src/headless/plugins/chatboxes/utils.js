import { _converse, converse } from '../../core.js';
import log from '../../log';

const { Strophe } = converse.env;

export async function createChatBox(jid, attrs, Model) {
    jid = Strophe.getBareJidFromJid(jid.toLowerCase());
    Object.assign(attrs, { 'jid': jid, 'id': jid });
    let chatbox;
    try {
        chatbox = new Model(attrs, { 'collection': _converse.chatboxes });
    } catch (e) {
        log.error(e);
        return null;
    }
    await chatbox.initialized;
    if (!chatbox.isValid()) {
        chatbox.destroy();
        return null;
    }

    if (_converse.chatboxes.length >= 3) {
        let JID = _converse.chatboxes.models[1].attributes.jid;
        let model = _converse.chatboxes.get(JID);
        model.close();
    }

    _converse.chatboxes.add(chatbox);
    return chatbox;
}
