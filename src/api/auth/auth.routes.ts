import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import AuthService from "../../services/auth.service";
import { IUserInput } from "../../interfaces/IUser";
import { Auth } from "../../_middlewares/auth";
import {
    signinSchema,
    signupSchema,
    updateSchema,
    verifyEmailSchema,
} from "./auth.validators";
import Role from "../../constants/roles";

const router = Router();

router.post("/login", signinSchema, login);
router.post("/register-staff", signupSchema, registerStaff);
router.post("/register", signupSchema, register);
router.post("/verify-email", verifyEmailSchema, verifyEmail);
router.get("/", Auth(Role.admin), getAll);
router.get("/:id", Auth(), getById);
router.post("/create-staff", Auth(Role.admin), signupSchema, create);
router.put("/:id", Auth(), updateSchema, update);
router.delete("/:id", Auth(), _delete);

function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const authServiceInstance = Container.get(AuthService);
    authServiceInstance
        .login(email, password)
        .then(({ user, token }) => {
            res.json({ user, token });
        })
        .catch(next);
}

function register(req: Request, res: Response, next: NextFunction) {
    req.body.role = Role.user;
    const authServiceInstance = Container.get(AuthService);
    authServiceInstance
        .register(req.body, req.get("origin"))
        .then(({ user, token }) => {
            return res.status(201).json({
                user,
                token,
                message:
                    "Registration successfull, please check your email for verification instructions",
            });
        })
        .catch(next);
}

function registerStaff(req: Request, res: Response, next: NextFunction) {
    req.body.role = Role.staff;
    const authServiceInstance = Container.get(AuthService);
    authServiceInstance
        .register(req.body, req.get("origin"))
        .then(({ user, token }) => {
            return res.json({
                user,
                token,
                message:
                    "Registration successfull, please check your email for verification instructions",
            });
        })
        .catch(next);
}

function verifyEmail(req: Request, res: Response, next: NextFunction) {
    const authServiceInstance = Container.get(AuthService);
    authServiceInstance
        .verifyEmail(req.body)
        .then(() => res.json({ message: "Verification successfull" }))
        .catch(next);
}

function getAll(req: Request, res: Response, next: NextFunction) {
    const authServiceInstance = Container.get(AuthService);
    authServiceInstance
        .getAll()
        .then((accounts) => res.json(accounts))
        .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction) {
    const authServiceInstance = Container.get(AuthService);
    // users can get their own account and admin can get any account
    const id = parseInt(req.params.id);
    if (id !== req.user.id && req.user.role !== Role.admin) {
        return res.status(401).json({ message: "Unathorized" });
    }

    authServiceInstance
        .getById(id)
        .then((account) => (account ? res.json(account) : res.sendStatus(404)))
        .catch(next);
}

function create(req: Request, res: Response, next: NextFunction) {
    const authServiceInstance = Container.get(AuthService);
    authServiceInstance
        .create(req.body)
        .then((account) => res.json(account))
        .catch(next);
}

function update(req: Request, res: Response, next: NextFunction) {
    const authServiceInstance = Container.get(AuthService);
    // users can update their accounts and admin can update any account
    const id = parseInt(req.params.id);
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.admin) {
        return res.status(401).json({ message: "Unathorized" });
    }

    authServiceInstance
        .update(id, req.body)
        .then((account) => res.json(account))
        .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction) {
    const authServiceInstance = Container.get(AuthService);
    // users can delete their accounts and admin can update any account
    const id = parseInt(req.params.id);
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.admin) {
        return res.status(401).json({ message: "Unathorized" });
    }

    authServiceInstance
        ._delete(id)
        .then(() =>
            res.json({
                message: "Account deleted successfully",
                id: req.params.id,
            })
        )
        .catch(next);
}
