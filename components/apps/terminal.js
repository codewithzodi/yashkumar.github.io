import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["projects", "skills", "experience", "education", "certifications", "interests", "personal-documents"],
            projects: ["Zod-Cloud-VPS-Hosting", "AI-Plant-Disease-System", "Roamy-Travel-Assistant", "CCTV-Surveillance-System"],
            skills: ["Python", "Golang", "SQL", "Azure-GCP", "Linux-Ubuntu", "Docker", "Machine-Learning", "Cybersecurity"],
            experience: ["ORITSO-Pvt-Ltd-Internship", "Project-Lead-Zod-Cloud", "Project-Lead-Skills4Future"],
            education: ["Vishwakarma-University-BTech", "Presidium-Higher-Secondary", "Ch-Chhabil-Dass-Secondary"],
            certifications: ["IBM-Full-Stack-Developer", "IBM-Cybersecurity-Fundamentals", "Google-Programming-with-Go", "Cisco-Intro-to-Cybersecurity", "LinkedIn-AI-Machine-Learning"],
            interests: ["Cybersecurity-Enthusiast", "Python-Backend-Dev", "Cloud-Infrastructure", "AI-Integration"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-[#00ff00] font-bold" style={{ textShadow: "0 0 5px #00ff0080" }}>yash@kali</div>
                        <div className="text-[#00ff00] mx-px font-medium">:</div>
                        <div className=" text-[#3b82f6] font-bold" style={{ textShadow: "0 0 5px #3b82f680" }}>{this.current_directory}</div>
                        <div className="text-[#00ff00] mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider text-[#00ff00]" style={{ textShadow: "0 0 5px #00ff0080" }}></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-[#00ff00]" style={{ boxShadow: "0 0 10px #00ff00" }}></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal text-[#00ff00]"} style={{ textShadow: "0 0 5px #00ff0080" }}></div>
            </React.Fragment>
        );
    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<a href="#" target="_blank" class="font-bold mr-2 text-[#3b82f6] cursor-pointer hover:underline" style="text-shadow: 0 0 5px #3b82f680">'${file}'</a>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    typeWriter = (text, elementId, callback) => {
        if (!text) {
            if (callback) callback();
            return;
        }
        let i = 0;
        let speed = 1; // Even faster for complex ASCII
        let element = document.getElementById(elementId);
        if (!element) return;

        const type = () => {
            if (i < text.length) {
                if (text.charAt(i) === "<") {
                    let tag = "";
                    while (text.charAt(i) !== ">" && i < text.length) {
                        tag += text.charAt(i);
                        i++;
                    }
                    tag += ">";
                    i++;
                    element.innerHTML += tag;
                } else if (text.charAt(i) === "&") {
                    let entity = "";
                    while (text.charAt(i) !== ";" && i < text.length) {
                        entity += text.charAt(i);
                        i++;
                    }
                    entity += ";";
                    i++;
                    element.innerHTML += entity;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        };
        type();
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/yash")
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands:[ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg]";
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "about-yash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-yash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg ]";
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "whoami":
                result = `Yash Kumar<br/>
----------------------------------------<br/>
> Python Developer | Cloud & Cybersecurity Enthusiast<br/><br/>
Trainee Software Engineer aspirant with strong foundations in Python & Go.<br/>
Building scalable backend systems, automation tools, and AI-powered solutions.<br/><br/>
⚡ Focus Areas:<br/>
- Backend Development & APIs<br/>
- Cloud & DevOps (Azure, GCP)<br/>
- Cybersecurity & System Automation<br/>
- AI/ML based solutions<br/><br/>
💼 Current Experience:<br/>
Associate Technology Trainee (Intern)<br/>
Oritso Pvt Ltd<br/>
Mar 2026 – Present | Noida, Uttar Pradesh, India<br/><br/>
🚀 Currently Working On:<br/>
Zod Cloud – VPS & Hosting Automation Platform<br/><br/>
📍 Ghaziabad, UP, India`;
                break;
            case "resume":
                this.props.openApp("about-yash");
                result = "Opening Resume Preview...";
                break;
            case "neofetch":
                const ascii = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_____<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_.+sd\\$\\$\\$\\$\\$\\$\\$\\$\\$bs+._<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.+d\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\$b+.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.sd\\$\\$\\$\\$\\$\\$\\$P^*^T\\$\\$\\$P^*"*^T\\$\\$\\$\\$\$bs.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.s\\$\\$\\$\\$\\$\\$\\$\\$P*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`*' _._&nbsp;&nbsp;\`T\\$\\$\\$\\$\\$\\$\\$s.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.s\\$\\$\\$\\$\\$\\$\\$\\$\\$P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\` :\\$;&nbsp;&nbsp;&nbsp;T\\$\\$\\$\\$\\$\\$\\$\\$s.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$;&nbsp;&nbsp;db..+s.&nbsp;&nbsp;&nbsp;\`**'&nbsp;&nbsp;&nbsp;&nbsp;T\\$\\$\\$\\$\\$\\$\\$\\$\\$s<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$'&nbsp;&nbsp;\`T\\$P*'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;.\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$.<br/>
&nbsp;&nbsp;&nbsp;.\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$.<br/>
&nbsp;&nbsp;:\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$;<br/>
&nbsp;&nbsp;\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$P^*'&nbsp;:\\$\\$b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$<br/>
&nbsp;:\\$\\$\\$\\$\\$\\$\\$P'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T\\$\\$\\$\\$\\$bs._&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:P'\`*^T\\$\\$\\$\\$\\$\\$\\$;<br/>
&nbsp;\\$\\$\\$\\$\\$\\$\$P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`*T\\$\\$\\$\\$\\$b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`T\\$\\$\\$\\$\\$\\$<br/>
:\\$\\$\\$\\$\\$\\$\\$b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`*T\\$\\$\\$s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:\\$\\$\\$\\$\\$;<br/>
:\\$\\$\\$\\$\\$\\$\\$\\$b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\$\\$\\$\\$\\$;<br/>
\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:\\$\\$\\$\\$\\$\\$<br/>
\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$bs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.\\$\\$\\$\\$\\$\\$\\$<br/>
\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$bs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.d\\$\\$\\$\\$\\$\\$\\$\\$<br/>
:\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$P*"*T\\$\\$bs,._&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.sd\\$\\$\\$\\$\\$\\$\\$\\$\\$;<br/>
:\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TP^**T\\$bss++.._____..++sd\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$;<br/>
&nbsp;\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`T\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$<br/>
&nbsp;:\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`*T\\$\\$\\$P^*"*"*^^*T\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$;<br/>
&nbsp;&nbsp;\\$\\$\\$b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`T\\$b+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:\\$\\$\\$\\$\\$\\$\\$BUG\\$\\$<br/>
&nbsp;&nbsp;:\\$P'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`"'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,._.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$;<br/>
&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`*TP*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d\\$\\$\\$P*******\\$<br/>
&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:\\$\\$P'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dP'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d\\$P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'<br/>
[bug]&nbsp;&nbsp;&nbsp;\`.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`-.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`-.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`*+-._&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_.-+*'<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`"*-------*"'`;

                const info = `
<div class='text-[#00ffff] font-bold underline'>yash@kali</div>
<div><span class='text-[#00ffff] font-bold'>OS:</span> Kali GNU/Linux Rolling x86_64</div>
<div><span class='text-[#00ffff] font-bold'>Host:</span> Yash Portfolio</div>
<div><span class='text-[#00ffff] font-bold'>Kernel:</span> 6.1.0-kali7-amd64</div>
<div><span class='text-[#00ffff] font-bold'>Uptime:</span> since 2004</div>
<div><span class='text-[#00ffff] font-bold'>Shell:</span> bash 5.2.15</div>
<div><span class='text-[#00ffff] font-bold'>DE:</span> Xfce 4.18</div>
<div><span class='text-[#00ffff] font-bold'>WM:</span> Xfwm4</div>
<div><span class='text-[#00ffff] font-bold'>Terminal:</span> yash-terminal</div>
<div><span class='text-[#00ffff] font-bold'>CPU:</span> AMD Ryzen 7 5800H</div>
<div><span class='text-[#00ffff] font-bold'>Memory:</span> 4096MiB / 16384MiB</div>
</div>`;

                const skeleton = `<table class='border-none border-spacing-0'>
                    <tr>
                        <td class='align-top pr-6 text-[#55ffff] text-[6px] leading-[6px]' id='ascii-${rowId}' style='white-space: pre;'></td>
                        <td class='align-top pt-2' id='info-${rowId}'></td>
                    </tr>
                </table>`;

                document.getElementById(`row-result-${rowId}`).innerHTML = skeleton;
                this.typeWriter(ascii, `ascii-${rowId}`);
                setTimeout(() => {
                    this.typeWriter(info, `info-${rowId}`, () => {
                        this.appendTerminalRow();
                    });
                }, 50);
                return;
            case "sudo":

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/speed-ishowspeed.png' />";
                break;
            default:
                result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-yash, trash, settings, sendmsg, whoami, resume, neofetch ]";
        }
        this.typeWriter(result, `row-result-${rowId}`, () => {
            this.appendTerminalRow();
        });
    }

    xss(str) {
        if (!str) return "";
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-[#00ff00] text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
