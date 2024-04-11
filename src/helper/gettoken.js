import jwt from "jsonwebtoken";

export const getDataFromToken = (NextRequest)=>{
    try {
        const token = NextRequest.cookies.get('notes')?.value || '';
        const decoded = jwt.verify(token, process.env.KEY );
        return decoded._id;
    } catch (error) {
        throw new Error(error.message);
    }
}