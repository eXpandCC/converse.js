import BootstrapModal from "./base.js";
import tpl_chat_status_modal from "./templates/chat-status.js";
import { __ } from '../i18n';
import { _converse, converse } from "@converse/headless/core";

const u = converse.env.utils;


const ChatStatusModal = BootstrapModal.extend({
    id: "modal-status-change",
    events: {
        "submit form#set-xmpp-status": "onFormSubmitted",
    },

    toHTML () {
        return tpl_chat_status_modal(
            Object.assign(
                this.model.toJSON(),
                this.model.vcard.toJSON(), {
                'label_away': __('Away'),
                'label_busy': __('Busy'),
                'label_cancel': __('Cancel'),
                'label_close': __('Close'),
                'label_custom_status': __('Custom status'),
                'label_offline': __('Offline'),
                'label_online': __('Online'),
                'label_save': __('Save'),
                'label_xa': __('Away for long'),
                'modal_title': __('Change chat status'),
                'placeholder_status_message': __('Personal status message')
            }));
    },

    afterRender () { },

    onFormSubmitted (ev) {
        ev.preventDefault();
        const data = new FormData(ev.target);
        this.model.save({
            'status_message': data.get('status_message'),
            'status': data.get('chat_status')
        });
        this.modal.hide();
    }
});


_converse.ChatStatusModal = ChatStatusModal;

export default ChatStatusModal;
