import {
  BufferJSON,
  AuthenticationCreds
} from "@whiskeysockets/baileys";
import Whatsapp from "../models/Whatsapp";

export const authStateLegacy = async (whatsapp: Whatsapp) => {
  const updateWhatsappData = await Whatsapp.findOne({
    where: {
      id: whatsapp.id
    }
  });
  let state: AuthenticationCreds;
  if (updateWhatsappData?.session) {
    state = JSON.parse(updateWhatsappData?.session, BufferJSON.reviver);
  }

  return {
    state,
    saveState: async () => {
      const str = JSON.stringify(state, BufferJSON.replacer, 2);
      await whatsapp.update({
        session: str
      });
    }
  };
};

export default authStateLegacy;
