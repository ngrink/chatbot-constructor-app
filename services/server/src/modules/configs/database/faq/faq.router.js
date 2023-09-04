import express from "express";

import { AuthMiddleware } from '#auth';
import { FaqController } from './faq.controller';


const router = express.Router({mergeParams: true});

router.get("/",
  FaqController.getAllFaqs
);

router.post("/:faqId",
  FaqController.addFaq
);

router.patch("/:faqId",
  FaqController.updateFaq
);

router.delete("/:faqId",
  FaqController.deleteFaq
);

export { router as FaqRouter }
