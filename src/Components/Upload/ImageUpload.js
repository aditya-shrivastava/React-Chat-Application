import React, { Component } from 'react';
import './ImageUpload.css';
import axios from 'axios';

class ImageUpload extends Component {
	constructor() {
		super();

		this.state = {
			selectedFile: null,
		};
	}

	handleChange = (e) => {
		this.setState({
			selectedFile: e.target.files[0],
			loaded: 0,
		});
	};

	handleClick = () => {
		const data = new FormData();
		data.append('file', this.state.selectedFile);
		// console.log(this.state.selectedFile);
	};

	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-6'>
						<form method='post' action='#' id='#'>
							<div className='form-group files'>
								<label>Upload File</label>
								<input
									type='file'
									className='form-control'
									accept='image/png, image/jpeg'
									onChange={this.handleChange}
								/>
							</div>
						</form>
						<button
							type='button'
							className='btn btn-success btn-block'
							onClick={this.handleClick}
						>
							Upload
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ImageUpload;
