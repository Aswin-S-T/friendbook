import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList({ userPost }) {
	return (
		<ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
			{userPost &&
				userPost.map((item, index) => (
					<ImageListItem key={index}>
						<img
							src={`${item.imageUrl}`}
							srcSet={`${item.imageUrl}`}
							alt={""}
							loading="lazy"
						/>
					</ImageListItem>
				))}
		</ImageList>
	);
}
