import { FiX } from "react-icons/fi";

const Notice = ({ message, onClose }: { message?: string; onClose: () => void }) => {
    if (!message) return null;
    return <div className="field-notice" role="status"><span className="field-notice-signal" /><div><small>FIELD SYSTEM</small><p>{message}</p></div><button type="button" onClick={onClose} aria-label="Dismiss notification"><FiX /></button></div>;
};

export default Notice;
