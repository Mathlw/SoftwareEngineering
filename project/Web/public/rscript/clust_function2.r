library(stringdist)

args = commandArgs(TRUE)
sample_part = args[1]
sample = rep(1,length(args)-1)
for(i in 1:length(sample)){
	sample[i] = args[i+1]
}


printResult = function(sample_part,sample){
	Rdata = read.csv("D:/2016.2ÇÐ±â ¼ÒÇÁÆ®¿þ¾î°øÇÐ/project/public/data/all.csv", stringsAsFactors=F);
	
	distTable = c();
	for(k in 1:nrow(Rdata)){
		target = Rdata[k,-c(1,2,3,length(Rdata)-2,length(Rdata)-1,length(Rdata))];
		target_part = Rdata[k,1];
		target = target[target != ""];
		dist = rep(0, length(sample));
		for(i in 1:length(sample)){
			for(j in 1:length(target)){
				temp_dist = abs(1-stringdist(sample[i],target[j], method="jw"));
				if(dist[i] < temp_dist){
					if(sample_part == target_part){
						dist[i] = temp_dist;
					} else {
						dist[i] = 0.9 * temp_dist;
					}
				}
			}
		}		
		distTable = rbind(distTable,dist);
	}

	colnames(distTable) = sample;
	rownames(distTable) = seq(1,nrow(distTable),by=1);
	
	asdf = data.frame(distTable);
	rownames(asdf) = Rdata$Áúº´;
	asdf$Æò±Õ = 0;
	
	for(i in 1:nrow(asdf)){
		sum = 0;
		Q_1_count = 0;
		Q_2_count = 0;
		Q_3_count = 0;
		Q_4_count = 0;
		for(j in 1:(length(asdf)-1)){
			if(asdf[i,j]<0.25){
				sum = sum + 0.25*asdf[i,j];
				Q_1_count = Q_1_count + 1;
			} else if(asdf[i,j]<0.5){
				sum = sum + 0.5*asdf[i,j];
				Q_2_count = Q_2_count + 1;
			} else if(asdf[i,j]<0.75){
				sum = sum + 0.75*asdf[i,j];
				Q_3_count = Q_3_count + 1;
			} else {
				sum = sum + 1*asdf[i,j];
				Q_4_count = Q_4_count + 1;
			}
		}
		asdf$Æò±Õ[i] = round((sum/(Q_1_count + Q_2_count + Q_3_count + Q_4_count))*100);
	}
	resultMatirx = cbind(rownames(asdf[order(asdf$Æò±Õ, decreasing=T),][1:5,]),
		asdf[order(asdf$Æò±Õ, decreasing=T),][1:5,length(asdf)]);
	return(resultMatirx);
}

result = printResult(sample_part, sample)
result[1,1]
result[1,2]
result[2,1]
result[2,2]
result[3,1]
result[3,2]
result[4,1]
result[4,2]
result[5,1]
result[5,2]