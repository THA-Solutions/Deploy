import db from "../lib/db";
import bcrypt from "bcryptjs";

export async function register(body) {
  const userData = JSON.parse(body);
  try {

    const user = await db.user.findUnique({
      where: {
        email: userData.email,
      },
    });
   
    if (user) {
      return null;
    } else {
      const createdUser = await db.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phone: Number(userData.phone),
        },
      });

      return createdUser;
    }
  } catch (error) {
    console.error("Erro na criacao do usuario", error);
  }
}

export async function registerAddress(body) {
  try {
    const addressData = JSON.parse(body);

    const user = await db.user.findFirst({
      where: { email: addressData.userEmail },
    });

    const address = await db.endereco.findMany({ where: { userId: user.id } });

    if (!address) {
      return address;
    } else {
      const createdAddress = await db.endereco.create({
        data: {
          cep: Number(addressData.cep),
          logradouro: addressData.logradouro,
          numero: Number(addressData.numero),
          bairro: addressData.bairro,
          complemento: addressData.complemento,
          cidade: addressData.cidade,
          estado: addressData.estado,
          userId: user.id,
        },
      });

      return createdAddress;
    }
  } catch (error) {
    console.error("Erro na criacao do endereço", error);
  }
}

export async function singInResquest(body) {
  try {
    const userData = body;
    const user = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (user) {
      const validate = bcrypt.compareSync(userData.password, user.password);
      if (validate) {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          permissions: user.permissions,
          id: user.id,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error, "Falha ao logar");
    throw new Error("Senha incorreta!");
  }
}

export async function findUser(token) {
  const session = db.session.findFirst({
    where: { session_token: token },
  });
  const user = await db.user.findUnique({
    where: { id: session.userId },
  });
  return user;
}

export async function updateAddress(body) {
  try {
    const addressData = JSON.parse(body);

    const user = await db.user.findUnique({
      where: {
        email: addressData.userEmail,
      },
    });

    const address = await db.endereco.findMany({
      where: {
        userId: user.id,
      },
    });

    if(address){

    const updatedAddress = await db.endereco.update({
      where: {
        id_endereco: address[0].id_endereco,
      },
      data: {
        cep: Number(addressData.cep),
        logradouro: addressData.logradouro,
        numero: Number(addressData.numero),
        bairro: addressData.bairro,
        complemento: addressData.complemento,
        cidade: addressData.cidade,
        estado: addressData.estado,
      },
    });
    return updatedAddress;
  }else{

    const createdAddress = await db.endereco.create({
      user_id:user.id,
        cep: Number(addressData.cep),
        logradouro: addressData.logradouro,
        numero: Number(addressData.numero),
        bairro: addressData.bairro,
        complemento: addressData.complemento,
        cidade: addressData.cidade,
        estado: addressData.estado,
      
    });
    return createdAddress;
  }
    
  } catch (error) {
    console.error("Erro na atualização do endereço", error);
  }
}

//Encontra as informacoes atuais do usuario e aplica as alteracoes
export async function updateUser(body) {
  try {
    const userData = body;
    const user = await db.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: userData.email,
        phone: Number(userData.phone),
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Erro na atualização do usuário", error);
  }
}

export async function checkAddress(param) {
  try {
    const user = await db.user.findFirst({ where: { email: param } });

    if (user) {
      const [address] = await db.endereco.findMany({
        where: { userId: user.id },
      });
      if(address){
        return {...address,phone:Number(user.phone)};
      }
    } else {
      return null;
    }
  } catch {
    console.error("Erro ao buscar endereço", error);
  }
}
