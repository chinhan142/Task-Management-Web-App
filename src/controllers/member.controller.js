import { addMember, deleteMember } from "../services/member.service.js";
import { sendResponse } from "../utils/response.util.js";

export const addMemberController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const projectMember = await addMember({ id, userId });

    sendResponse(res, 200, true, "Add member successfully!", projectMember);
  } catch (error) {
    next(error);
  }
};

export const deleteMemberController = async (req, res, next) => {
  try {
    const { id, memberId } = req.params;

    const deletedMember = await deleteMember({ id, memberId });

    sendResponse(res, 200, true, "Delete member successfully!", deletedMember);
  } catch (error) {
    next(error);
  }
};
