import express from 'express';
import passport from 'passport';
let router = express.Router();

router.route('/google/auth').get(passport.authenticate('google',{
                                                                successRedirect: '/',
                                                                failure: '/'

                                                              }
))
router.route('/google').get(passport.authenticate('google',{
                                                                scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/plus.profile.emails.read','https://www.googleapis.com/auth/userinfo.email'],
                                                                failure: '/'

                                                              }
))


export default router;
