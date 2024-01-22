import jwt,{ JwtPayload } from "jsonwebtoken";

interface SignOption {
//fecha de caducidad del token
    expiresIn?:string | number;
}

const DEFAULT_SIGN_OPTION: SignOption={
    expiresIn:"1h"
}
export function signJwtAccessToken(payload:JwtPayload, options:SignOption= DEFAULT_SIGN_OPTION){
    const secret_key=process.env.NEXTAUTH_SECRET;
    const token= jwt.sign(payload,secret_key!,options)
    return token
}

export function verifyJwt(token:string){
    try {
    const secret_key=process.env.NEXTAUTH_SECRET;
    const decoded= jwt.verify(token,secret_key!)
    return decoded as JwtPayload
    } catch (error) {
        console.log(error);
        return null;
    }
}

// export function extractTokenHeader(request:NextRequest){
//     const accessTokenWithBearer=request.headers.get("authorization")
//     if (accessTokenWithBearer) {
//         const [bearer, token] = accessTokenWithBearer.split(' ');
//         return token
//       } else {
//         return new Response(JSON.stringify({
//             error: "No autorizado"
//         }),
//         {
//          status: 401
//         })
//       }
// }