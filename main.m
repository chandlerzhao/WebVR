% %Generate Test data
% green=0.5*randn(250,2)+3.5;
% red=randn(250,2)+1;
% blue = 0.5*randn(250,2) + 2.5;
% values = [red;blue;green];
% 
% %Plot Test Data
% figure;
% plot(green(:,1),green(:,2),'g*',red(:,1),red(:,2),'r*',blue(:,1),blue(:,2),'*b');
% figure;
% plot(values(:,1),values(:,2),'k*');

%Modeling
% [px,model] = gmm(values,3);
% [px2,model2] = gmm(values,4);
% [px3,model3] = gmm(values,5);
[px,model] = gmm(values(:,1:3),9);
%tagging
% result = tag(px);
% result2 = tag(px2);
result = tag(px);
%plotting
figure;
for i=1:size(values,1)
    r = result(i,1);
    if r==1
        plot3(values(i,1),values(i,2),values(i,3),'c*');
        hold on;
    elseif r==2
        plot3(values(i,1),values(i,2),values(i,3),'m*');
        hold on;
    elseif r==3
        plot3(values(i,1),values(i,2),values(i,3),'k*');
        hold on;
    elseif r==4
        plot3(values(i,1),values(i,2),values(i,3),'r*');
        hold on;
    elseif r==5
        plot3(values(i,1),values(i,2),values(i,3),'g*');
        hold on;
    elseif r==6
        plot3(values(i,1),values(i,2),values(i,3),'y*');
        hold on;
    elseif r==7
        plot3(values(i,1),values(i,2),values(i,3),'b*');
        hold on;
    elseif r==8
        plot3(values(i,1),values(i,2),values(i,3),'Color', [0.4 0.4 0.4]);
        hold on;
    elseif r==9
        plot3(values(i,1),values(i,2),values(i,3),'Color', [0.7 0.7 0.7]);
        hold on;
    end
end
grid on;
% figure 2d
% figure;
% for i=1:size(values,1)
%     r = result(i,1);
%     if r==1
%         plot(values(i,1),values(i,2),'c*');
%         hold on;
%     elseif r==2
%         plot(values(i,1),values(i,2),'m*');
%         hold on;
%     elseif r==3
%         plot(values(i,1),values(i,2),'k*');
%         hold on;
%     elseif r==4
%         plot(values(i,1),values(i,2),'r*');
%         hold on;
%     elseif r==5
%         plot(values(i,1),values(i,2),'g*');
%         hold on;
%     elseif r==6
%         plot(values(i,1),values(i,2),'y*');
%         hold on;
%     elseif r==7
%         plot(values(i,1),values(i,2),'b*');
%         hold on
%     end
% end
% figure;
% for i=1:size(values,1)
%     r = result2(i,1);
%     if r==1
%         plot(values(i,1),values(i,2),'c*');
%         hold on;
%     elseif r==2
%         plot(values(i,1),values(i,2),'m*');
%         hold on;
%     elseif r==3
%         plot(values(i,1),values(i,2),'k*');
%         hold on;
%     elseif r==4
%         plot(values(i,1),values(i,2),'r*');
%         hold on;
%     elseif r==5
%         plot(values(i,1),values(i,2),'g*');
%         hold on;
%     end
% end