import axios from "axios";

async function TelegramSend(message: string) {


    try {
        await axios.request({
            method: "POST",
            url: `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`,
            data: {
                chat_id: import.meta.env.VITE_TELEGRAM_ID,
                text: message,
            },
        });
        // await axios.request(options1);
    } catch (err) {
        console.log(err);
    }
}

export default TelegramSend;