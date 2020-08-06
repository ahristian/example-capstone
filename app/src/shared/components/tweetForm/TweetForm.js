import React, {useState} from 'react';
import {httpConfig} from "../../utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";
import {getAllTweets} from "../../actions/tweet";

import {TweetFormContent} from "./TweetFormContent";
import {useDispatch} from "react-redux";

export const TweetForm = () => {
	const tweet = {
		tweetContent: "",
	};

	const dispatch = useDispatch()

	const [status, setStatus] = useState(null);
	const validator = Yup.object().shape({
		tweetContent: Yup.string()
			.required("tweet content is required"),
	});

	const submitTweet = (values, {resetForm, setStatus}) => {

		httpConfig.post("/apis/tweet/", values)
			.then(reply => {
					let {message, type} = reply;
					
					if(reply.status === 200) {
						resetForm();
						dispatch(getAllTweets())
					}
					setStatus({message, type});
				}
			);
	};


	return (

		<Formik
			initialValues={tweet}
			onSubmit={submitTweet}
			validationSchema={validator}
		>
			{TweetFormContent}
		</Formik>

	)
};