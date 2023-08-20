const express = require(`express`);
const router = express.Router();
const verifyAuth = require(`../middlewares/verifyAuth`);


router.post(`/job_post`, verifyAuth, async (req, res) => {
    //getting all the details from the frontend user and perform validation checks
    const { 
        companyName, 
        logoURL, 
        position, 
        salary, 
        jobType, 
        location, 
        description, 
        about, 
        skillsRequired: skillsArray,
        recruiterName, 
    } = req.body;

    try {
        if (
            !companyName || 
            !logoURL || 
            !position || 
            !salary || 
            !jobType || 
            !location || 
            !description || 
            !about || 
            !{SkillsRequired: skillsArray} || 
            !recruiterName
        ) {
            return res.status().json({ error: `All the fields are required` }); 
        }

        const jobPost = new JobPost ({
            companyName, 
            logoURL, 
            position, 
            salary, 
            jobType, 
            location, 
            description, 
            about, 
            skillsRequired: skillsArray,
            recruiterName,
        });

        await jobPost.save();

        return res.json({
            message: `Job posted successfully`,
            name: recruiterName,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false, 
            errorMessage: `Something went wrong! Please try again later...` 
        });
    }
});


module.exports = router;