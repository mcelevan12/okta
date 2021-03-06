package com.capping;

import com.capping.bean.PersonalInformation;
import com.capping.bean.EmployeeProgram;
import com.capping.bean.ActiveRequest;
import com.capping.bean.ValidProgram;
import com.capping.bean.Manage;
import com.capping.service.IPersonalInformationService;
import com.capping.service.IActiveRequestService;
import com.capping.service.IEmployeeProgramService;
import com.capping.service.IManageService;
import com.capping.service.IValidProgramService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capping.service.IPersonalInformationService;
import com.capping.service.IEmployeeProgramService;
import com.capping.service.IValidProgramService;
import com.capping.service.IActiveRequestService;
import com.capping.service.IManageService;
import com.capping.bean.ActiveRequest;
import java.util.List;
import java.util.LinkedList;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
//@EnableOAuth2Sso
@SpringBootApplication
public class Application {

    @Autowired
    IPersonalInformationService personalInformationService;
    @Autowired
    IEmployeeProgramService employeeProgramService;
    @Autowired
    IValidProgramService validProgramService;
    @Autowired
    IActiveRequestService activeRequestService;
    @Autowired
    IManageService manageService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /*@GetMapping("/api/username")
    public String getUsername(Principal principal) {
        return principal.getName();
    }*/
	
    @GetMapping("/api/employee/{username}")
    public @ResponseBody ResponseEntity<String> getEmployeeProfilePage(@PathVariable String username){
        PersonalInformation personalInformation = (PersonalInformation) personalInformationService.find(username);
        return new ResponseEntity<String>(personalInformation.toString(),HttpStatus.OK);
    }

    @GetMapping("/api/myteam/{username}")
    public @ResponseBody ResponseEntity<String> getMyTeam(@PathVariable String username){//Principal principal) {
        Manage manager = (Manage) manageService.findByManagedUsername(username);//principal.getName());

        List<Manage> managed = manageService.findByManagerUsername(manager.managerUsername());
        List<PersonalInformation> teammates = new LinkedList();
        teammates.add((PersonalInformation) personalInformationService.find(manager.managerUsername()));
        for(String managedUsername : managed.stream().map(manage -> manage.managedUsername()).collect(Collectors.toList())) {
            teammates.add(personalInformationService.find(managedUsername));
        }
        return new ResponseEntity<String>(teammates.toString(), HttpStatus.OK);
    }

    @GetMapping("/api/advancedsearchemployee/")
    public @ResponseBody ResponseEntity<String> getAdvancedSearchedEmployees(@RequestParam(value="city") String city,
            @RequestParam(value="username") String username, @RequestParam(value="firstName") String firstName,
            @RequestParam(value="lastName") String lastName, @RequestParam(value="jobTitle") String jobTitle,
            @RequestParam(value="workPhoneNumber") String workPhoneNumber) {
        List<PersonalInformation> personalInformationList = (List<PersonalInformation>) personalInformationService.findAll();
        List<PersonalInformation> validPersonalInformationList = new LinkedList<>();
        boolean flag = true;
        for(PersonalInformation p : personalInformationList) {
            if(!p.username.equals("") && !p.username.equals(username)) { flag = false; }
            if(!p.city.equals("") && !p.city.equals(city)) { flag = false; }
            if(!p.firstName.equals("") && !p.firstName.equals(firstName)) { flag = false; }
            if(!p.lastName.equals("") && !p.lastName.equals(lastName)) { flag = false; }
            if(!p.jobTitle.equals("") && !p.jobTitle.contains(jobTitle)) { flag = false; }
            if(!p.workPhoneNumber.equals("") && !p.workPhoneNumber.equals(workPhoneNumber)) { flag = false; }
            if(flag) {validPersonalInformationList.add(p);}
       }
       return new ResponseEntity<String>(validPersonalInformationList.toString(), HttpStatus.OK);
    }

    @GetMapping("/api/searchemployee/{plusSeparatedParameters}")
    public @ResponseBody ResponseEntity<String> getSearchedEmployees(@PathVariable String plusSeperatedParameters) {
        List<PersonalInformation> personalInformationList = (List<PersonalInformation>) personalInformationService.findAll();
        String[] searchParameters = plusSeperatedParameters.split("+");
        return new ResponseEntity<String>(personalInformationList.stream()
                        .filter(info -> info.containsParameters(searchParameters))
                        .collect(Collectors.toList()).toString(),
                HttpStatus.OK);
    }

    @GetMapping("/api/myprograms/{username}")
    public @ResponseBody ResponseEntity<String> getEmployeePrograms(@PathVariable String username) {

        List<EmployeeProgram> employeeProgramList = (List<EmployeeProgram>) employeeProgramService.findByUsername(username);
        return new ResponseEntity<String>(employeeProgramList.toString(),HttpStatus.OK);
    }

    @GetMapping("/api/programlist/{username}")
    public @ResponseBody ResponseEntity<String> getValidProgramList(@PathVariable String username) {

        List<ValidProgram> validPrograms = (List<ValidProgram>) validProgramService.findAll();
        List<EmployeeProgram> employeeProgramList = (List<EmployeeProgram>) employeeProgramService.findByUsername(username);
        return new ResponseEntity<String>(validPrograms.stream()
                .filter(program -> !(program.isAlreadyAccessedByEmployee(employeeProgramList)))
                .collect(Collectors.toList())
                .toString(), HttpStatus.OK);
    }


    @PostMapping("/api/requestaccess/")
    public ActiveRequest newAccessRequest(@RequestBody ActiveRequest activeRequest) {
        return activeRequestService.save(activeRequest);
    }

	
    @GetMapping("/api/activerequests/{username}")
    public @ResponseBody ResponseEntity<String> getActiveRequests(@PathVariable String username) {

        List<Manage> managed = manageService.findByManagerUsername(username);
        List<ActiveRequest> activeRequests = new LinkedList<>();
        for(String managedUsername : managed.stream().map(manage -> manage.managedUsername()).collect(Collectors.toList())) {
            activeRequests.addAll(activeRequestService.findAllByUsername(managedUsername));
        }
        return new ResponseEntity<String>(activeRequests.toString(), HttpStatus.OK);
    }

	/*
    public String username(Principal principal) {
        return principal.getName().split("@")[0];
    }*/
}